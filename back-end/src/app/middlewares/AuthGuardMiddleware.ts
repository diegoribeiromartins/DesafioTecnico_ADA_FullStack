import { NextFunction, Request, Response } from "express";
import { AuthController } from "../controllers";

export const AuthGuardMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      (req.headers?.authorization as string).replace("Bearer", "").trim() || "";
    const hasAccess = await AuthController.verifyToken(token);

    if (!hasAccess) throw { status: 403, message: "Forbidden" };
    else return next();
  } catch (error: any) {
    return res
      .status(error?.status || 500)
      .send(error?.message || "Internal Server Error");
  }
};
