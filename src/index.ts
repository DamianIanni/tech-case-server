import { App } from "./app";
import { testDbConnection } from "./db/testConnection";
import { env } from "./config/env";
const PORT = env.PORT || 4000;

App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // En la primera línea de tu index.ts
});

if (env.NODE_ENV === "development") {
  // testDbConnection();
}
