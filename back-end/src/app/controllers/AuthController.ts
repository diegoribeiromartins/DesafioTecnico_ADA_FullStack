import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import * as jwt from "jsonwebtoken";
import { compare } from "bcrypt";

const JWTSecret = process.env.JWTSecret as string;

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { body } = req;
      if (
        !body?.login ||
        body.login.length < 4 ||
        !body?.password ||
        body.password.length < 8
      )
        throw { status: 422, message: "Incorrect values" };

      const users = await UserModel.get(body.login);
      if (users.length !== 1) {
        throw { status: 404, message: "User not found" };
      }

      const user = users[0];

      const checkPasswordIsValid = await compare(body.password, user.password);
      if (!checkPasswordIsValid) {
        throw { status: 404, message: "User not found" };
      }

      return res.send({
        token: jwt.sign({ id: user.id }, JWTSecret),
      });
    } catch (error: any) {
      return res
        .status(error?.status || 500)
        .send(error?.message || "Internal Server Error");
    }
  }

  verifyToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, JWTSecret, async (err, decoded: any) => {
        if (err) {
          resolve(false);
          return;
        }

        const users = await UserModel.get(decoded["id"] as string);

        if (users.length !== 1) {
          resolve(false);
          return;
        }

        resolve(true);
        return;
      });
    }) as Promise<boolean>;
  }
}

export default new AuthController();
