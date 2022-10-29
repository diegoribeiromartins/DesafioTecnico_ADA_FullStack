import { Request, Response } from "express";
import CardModel from "../models/CardModel";

class CardController {
  async get(req: Request, res: Response) {
    const cards = await CardModel.get();
    return res.send(cards);
  }

  async create(req: Request, res: Response) {
    const body = req.body;
    await CardModel.create(body);
    const card = await CardModel.show();
    return res.status(201).send(card);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;
    await CardModel.update({
      id,
      ...body,
    });
    return res.status(200).send("Card updated");
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await CardModel.delete(+id);
    return res.status(202).send("Card deleted");
  }
}

export default new CardController();
