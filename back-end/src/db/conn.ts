import connect, { IN_MEMORY, sql } from "@databases/sqlite";
import * as bcrypt from "bcrypt";
import { passwordSaltRounds } from "../config/crypt.json";

const db = connect(IN_MEMORY, { verbose: true });

const initializeDatabase = async () => {
  await db.query(sql`
  CREATE TABLE users (
    id VARCHAR NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL
  )`);

  const ADACredentials = {
    id: "letscode",
    password: bcrypt.hash("lets@123", passwordSaltRounds),
  };

  await db.query(sql`
    INSERT INTO users (id, password)
    VALUES (${ADACredentials.id}, ${await ADACredentials.password})
  `);
};
initializeDatabase();

export default db;
