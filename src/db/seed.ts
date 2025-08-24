import { PoolClient } from "pg";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { dbpool } from "../config/database";

// --- CONFIGURATION ---
const CONFIG = {
  NUM_RANDOM_CENTERS: 4, // This number of centers will be created + the main admin center
  USERS_PER_CENTER: {
    managers: 14,
    employees: 28,
  },
  PATIENTS_PER_CENTER: {
    min: 100,
    max: 4000,
  },
  NOTES_PER_PATIENT: {
    min: 0,
    max: 5,
  },
  DEMO_ADMIN_EMAIL: "demo@admin.com",
  DEMO_PASSWORD: "password123",
};

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// --- HELPER FUNCTION FOR BULK INSERTION ---
async function bulkInsert(
  client: PoolClient,
  tableName: string,
  columns: string[],
  data: any[][],
  returning: string = "id"
): Promise<any[]> {
  if (data.length === 0) return [];

  const placeholders = data
    .map((_, i) => {
      const rowPlaceholders = columns.map(
        (__, j) => `$${i * columns.length + j + 1}`
      );
      return `(${rowPlaceholders.join(", ")})`;
    })
    .join(", ");

  const query = `INSERT INTO ${tableName} (${columns.join(
    ", "
  )}) VALUES ${placeholders} RETURNING ${returning}`;
  const values = data.flat();

  const result = await client.query(query, values);
  return result.rows;
}

// --- MAIN FUNCTION ---
async function main() {
  const client = await dbpool.connect();
  console.log("🚀 Iniciando el proceso de seeding...");

  const otherAdminsCredentials: { email: string; password: string }[] = [];

  try {
    await client.query("BEGIN");
    console.log("🧹 Cleaning the database...");
    await client.query(
      "TRUNCATE users, centers, patients, notes, user_centers, patient_centers RESTART IDENTITY CASCADE"
    );

    console.log("👤 Creating special users...");
    const hashedPassword = await bcrypt.hash(CONFIG.DEMO_PASSWORD, 10);
    const demoAdmin = (
      await bulkInsert(
        client,
        "users",
        ["first_name", "last_name", "email", "password"],
        [["Demo", "Admin", CONFIG.DEMO_ADMIN_EMAIL, hashedPassword]],
        "id"
      )
    )[0];
    const versatileUser = (
      await bulkInsert(
        client,
        "users",
        ["first_name", "last_name", "email", "password"],
        [["Alex", "Cross", "alex@cross.com", hashedPassword]],
        "id"
      )
    )[0];

    console.log("🏥 Creating centers...");
    const mainCenter = (
      await bulkInsert(
        client,
        "centers",
        ["name", "address", "phone"],
        [
          [
            faker.company.name(),
            faker.location.streetAddress(),
            faker.phone.number().replace(/\D/g, ""),
          ],
        ],
        "*"
      )
    )[0];

    const randomCentersData = Array.from(
      { length: CONFIG.NUM_RANDOM_CENTERS },
      () => [
        faker.company.name(),
        faker.location.streetAddress(),
        faker.phone.number().replace(/\D/g, ""),
      ]
    );
    const randomCenters = await bulkInsert(
      client,
      "centers",
      ["name", "address", "phone"],
      randomCentersData,
      "*"
    );
    const allCenters = [mainCenter, ...randomCenters];

    console.log("🔗 Linking users to centers...");
    let userCenterLinks: any[] = [
      [demoAdmin.id, mainCenter.id, "admin"], // Admin owns the main center
      [versatileUser.id, mainCenter.id, "manager"], // Versatile user is a manager in the main center
    ];

    // Assign a new admin to each random center and link the versatile user
    for (const center of randomCenters) {
      const newAdmin = (
        await bulkInsert(
          client,
          "users",
          ["first_name", "last_name", "email", "password"],
          [
            [
              faker.person.firstName(),
              faker.person.lastName(),
              faker.internet.email(),
              hashedPassword,
            ],
          ],
          "*"
        )
      )[0];
      userCenterLinks.push([newAdmin.id, center.id, "admin"]);
      // Make the versatile user also an employee in other centers
      userCenterLinks.push([versatileUser.id, center.id, "employee"]);

      console.log(`✅ Admin created for`, newAdmin.email);
      otherAdminsCredentials.push({
        email: newAdmin.email,
        password: CONFIG.DEMO_PASSWORD,
      });
    }

    for (const center of allCenters) {
      console.log(`👥 Creating and linking team for ${center.name}...`);
      const managersData = Array.from(
        { length: CONFIG.USERS_PER_CENTER.managers },
        () => [
          faker.person.firstName(),
          faker.person.lastName(),
          faker.internet.email(),
          hashedPassword,
        ]
      );
      const employeesData = Array.from(
        { length: CONFIG.USERS_PER_CENTER.employees },
        () => [
          faker.person.firstName(),
          faker.person.lastName(),
          faker.internet.email(),
          hashedPassword,
        ]
      );

      const createdManagers = await bulkInsert(
        client,
        "users",
        ["first_name", "last_name", "email", "password"],
        managersData
      );
      const createdEmployees = await bulkInsert(
        client,
        "users",
        ["first_name", "last_name", "email", "password"],
        employeesData
      );

      createdManagers.forEach((user) =>
        userCenterLinks.push([user.id, center.id, "manager"])
      );
      createdEmployees.forEach((user) =>
        userCenterLinks.push([user.id, center.id, "employee"])
      );

      const numPatients = getRandomInt(
        CONFIG.PATIENTS_PER_CENTER.min,
        CONFIG.PATIENTS_PER_CENTER.max
      );
      console.log(
        `👨‍👩‍👧‍👦 Creating and linking ${numPatients} patients for ${center.name}...`
      );
      const patientsData = Array.from({ length: numPatients }, () => [
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        faker.phone.number().replace(/\D/g, ""),
        faker.date.birthdate(),
        faker.lorem.words(getRandomInt(2, 5)),
      ]);
      const createdPatients = await bulkInsert(
        client,
        "patients",
        [
          "first_name",
          "last_name",
          "email",
          "phone",
          "date_of_birth",
          "short_description",
        ],
        patientsData
      );

      const patientCenterLinks = createdPatients.map((p) => [
        p.id,
        center.id,
        // faker.lorem.words(getRandomInt(2, 5)),
      ]);
      await bulkInsert(
        client,
        "patient_centers",
        ["patient_id", "center_id"],
        patientCenterLinks,
        "patient_id"
      );

      let notesData: any[] = [];
      for (const patient of createdPatients) {
        const numNotes = getRandomInt(
          CONFIG.NOTES_PER_PATIENT.min,
          CONFIG.NOTES_PER_PATIENT.max
        );
        for (let j = 0; j < numNotes; j++) {
          notesData.push([
            patient.id,
            faker.lorem.paragraph(),
            faker.date.past(),
          ]);
        }
      }
      if (notesData.length > 0) {
        await bulkInsert(
          client,
          "notes",
          ["patient_id", "note", "date"],
          notesData,
          "id"
        );
      }
    }

    console.log("🔗 Applying all user links...");
    await bulkInsert(
      client,
      "user_centers",
      ["user_id", "center_id", "role"],
      userCenterLinks,
      "user_id"
    );

    await client.query("COMMIT");
    console.log("✅ Seeding completed successfully.");
    console.log("---");
    console.log("🔑 Demo Admin account credentials:");
    console.log(`   Email: ${CONFIG.DEMO_ADMIN_EMAIL}`);
    console.log(`   Password: ${CONFIG.DEMO_PASSWORD}`);
    console.log("---");

    if (otherAdminsCredentials.length > 0) {
      console.log("🔑 Credentials for other admins (generated randomly):");
      otherAdminsCredentials.forEach((admin) => {
        console.log(`   Email: ${admin.email}`);
        console.log(`   Password: ${admin.password}`);
        console.log("   ---");
      });
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  } finally {
    client.release();
    await dbpool.end();
  }
}

main();
//           client,
//           "users",
//           ["first_name", "last_name", "email", "password"],
//           [
//             [
//               faker.person.firstName(),
//               faker.person.lastName(),
//               faker.internet.email(),
//               hashedPassword,
//             ],
//           ],
//           "id"
//         )
//       )[0];
//       userCenterLinks.push([newAdmin.id, center.id, "admin"]);
//       // Make the versatile user also an employee in other centers
//       userCenterLinks.push([versatileUser.id, center.id, "employee"]);
//     }

//     for (const center of allCenters) {
//       console.log(`👥 Creating and linking team for ${center.name}...`);
//       const managersData = Array.from(
//         { length: CONFIG.USERS_PER_CENTER.managers },
//         () => [
//           faker.person.firstName(),
//           faker.person.lastName(),
//           faker.internet.email(),
//           hashedPassword,
//         ]
//       );
//       const employeesData = Array.from(
//         { length: CONFIG.USERS_PER_CENTER.employees },
//         () => [
//           faker.person.firstName(),
//           faker.person.lastName(),
//           faker.internet.email(),
//           hashedPassword,
//         ]
//       );

//       const createdManagers = await bulkInsert(
//         client,
//         "users",
//         ["first_name", "last_name", "email", "password"],
//         managersData
//       );
//       const createdEmployees = await bulkInsert(
//         client,
//         "users",
//         ["first_name", "last_name", "email", "password"],
//         employeesData
//       );

//       createdManagers.forEach((user) =>
//         userCenterLinks.push([user.id, center.id, "manager"])
//       );
//       createdEmployees.forEach((user) =>
//         userCenterLinks.push([user.id, center.id, "employee"])
//       );

//       const numPatients = getRandomInt(
//         CONFIG.PATIENTS_PER_CENTER.min,
//         CONFIG.PATIENTS_PER_CENTER.max
//       );
//       console.log(
//         `👨‍👩‍👧‍👦 Creando y vinculando ${numPatients} pacientes para ${center.name}...`
//       );
//       const patientsData = Array.from({ length: numPatients }, () => [
//         faker.person.firstName(),
//         faker.person.lastName(),
//         faker.internet.email(),
//         faker.phone.number().replace(/\D/g, ""),
//         faker.date.birthdate(),
//       ]);
//       const createdPatients = await bulkInsert(
//         client,
//         "patients",
//         ["first_name", "last_name", "email", "phone", "date_of_birth"],
//         patientsData
//       );

//       const patientCenterLinks = createdPatients.map((p) => [
//         p.id,
//         center.id,
//         faker.lorem.words(getRandomInt(2, 5)),
//       ]);
//       await bulkInsert(
//         client,
//         "patient_centers",
//         ["patient_id", "center_id"],
//         patientCenterLinks,
//         "patient_id"
//       );

//       let notesData: any[] = [];
//       for (const patient of createdPatients) {
//         const numNotes = getRandomInt(
//           CONFIG.NOTES_PER_PATIENT.min,
//           CONFIG.NOTES_PER_PATIENT.max
//         );
//         for (let j = 0; j < numNotes; j++) {
//           notesData.push([
//             patient.id,
//             center.id,
//             faker.lorem.paragraph(),
//             faker.date.past(),
//           ]);
//         }
//       }
//       if (notesData.length > 0) {
//         await bulkInsert(
//           client,
//           "notes",
//           ["patient_id", "center_id", "note", "date"],
//           notesData,
//           "id"
//         );
//       }
//     }

//     console.log("🔗 Aplicando todos los vínculos de usuarios...");
//     await bulkInsert(
//       client,
//       "user_centers",
//       ["user_id", "center_id", "role"],
//       userCenterLinks,
//       "user_id"
//     );

//     await client.query("COMMIT");
//     console.log("✅ Seeding completado exitosamente.");
//     console.log("---");
//     console.log("🔑 Credenciales de la cuenta Demo Admin:");
//     console.log(`   Email: ${CONFIG.DEMO_ADMIN_EMAIL}`);
//     console.log(`   Password: ${CONFIG.DEMO_PASSWORD}`);
//     console.log("---");
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.error("❌ Error durante el seeding:", error);
//     process.exit(1);
//   } finally {
//     client.release();
//     await dbpool.end();
//   }
// }

// main();
