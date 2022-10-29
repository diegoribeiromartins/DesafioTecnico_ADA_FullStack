import { Request, Response } from "express";
import CardModel from "../models/CardModel";
import { log } from "../utils/log";

class CardController {
  async get(req: Request, res: Response) {
    const cards = await CardModel.get();
    return res.send(cards);
  }

  async create(req: Request, res: Response) {
    const body = req.body;

    try {
      if (body?.titulo < 2 && body?.conteudo.length < 2 && !body?.lista) {
        throw { status: 422, message: "Incorrect values" };
      }

      await CardModel.create(body);
      const card = await CardModel.show();
      if (card.length !== 1) throw {};

      log(card[0], "Criado");
      return res.status(201).send(card);
    } catch (error: any) {
      return res
        .status(error?.status || 500)
        .send(error?.send || "Internal server error");
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;

    try {
      if (!Number(id)) {
        throw {};
      }

      const card = await CardModel.show();
      if (card.length !== 1)
        throw {
          status: 404,
          message: "Card not found",
        };

      if (body?.titulo < 2 && body?.conteudo.length < 2 && !body?.lista) {
        throw { status: 400, message: "Incorrect values" };
      }

      const cardUpdated = {
        id,
        ...body,
      };
      await CardModel.update(cardUpdated);
      log(cardUpdated, "Alterado");
      return res.status(200).send([cardUpdated]);
    } catch (error: any) {
      return res
        .status(error?.status || 500)
        .send(error?.send || "Internal server error");
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!Number(id)) {
        throw {};
      }

      const card = await CardModel.show(id);
      if (card.length !== 1)
        throw {
          status: 404,
          message: "Card not found",
        };

      await CardModel.delete(+id);
      log(card[0], "Removido");
      return res.status(202).send(await CardModel.get());
    } catch (error: any) {
      return res
        .status(error?.status || 500)
        .send(error?.send || "Internal server error");
    }
  }
}

export default new CardController();
