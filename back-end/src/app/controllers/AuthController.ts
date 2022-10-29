import { Request, Response } from "express";

class AuthController {
  login(req: Request, res: Response) {
    return res.send("Login Route");
  }
}

export default new AuthController();
