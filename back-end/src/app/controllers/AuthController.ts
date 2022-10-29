import { Request, Response } from "express";
import UserModel from "../models/UserModel";

class AuthController {
  async login(req: Request, res: Response) {
    const { body } = req;
    const users = await UserModel.get(body.login);

    return res.send(users);
  }
}

export default new AuthController();
