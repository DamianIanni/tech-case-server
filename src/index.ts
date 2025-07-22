import { App } from "./app";
import { testDbConnection } from "./db/testConnection";

const PORT = process.env.PORT || 4000;

App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

testDbConnection();
