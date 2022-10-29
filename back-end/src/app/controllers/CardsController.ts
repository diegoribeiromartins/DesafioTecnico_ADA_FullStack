import { Request, Response } from "express";

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

  delete(req: Request, res: Response) {
    const { id } = req.params;

    return res.send(`Card Route id: ${id}`);
  }
}

export default new CardController();
