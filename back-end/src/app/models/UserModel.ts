import { db } from "../../db/conn";
import { sql } from "@databases/sqlite";

export type UserType = {
  id: string;
  password: string;
};

class CardModel {
  async get(id: string) {
    return await db.query(sql`
      SELECT * FROM users
      WHERE id = ${id}
    `);
  }
}

export default new CardModel();
