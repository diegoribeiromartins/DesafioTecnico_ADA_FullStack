import { Request, Response } from "express";
import db from "../../db/conn";
import { sql } from "@databases/sqlite";

class CardController {
  get(req: Request, res: Response) {
    return res.send("Card Route");
  }

  create(req: Request, res: Response) {
    return res.send("Card Route");
  }

  update(req: Request, res: Response) {
    const { id } = req.params;

    return res.send(`Card Route id: ${id}`);
  }

  async delete(req: Request, res: Response) {
    const getAllUsersFromQuery = await db.query(sql`
      SELECT * FROM users
    `);

    return res.send(getAllUsersFromQuery);
  }
}

export default new CardController();
