import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import { AuthRoutes, CardRoutes } from "./app/routes";
import { AuthGuardMiddleware } from "./app/middlewares";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  return res.send("Desafio Técnico ADA - Projeto BackEnd");
});

app.use(AuthRoutes);
app.use("/cards", [AuthGuardMiddleware], CardRoutes);

export default app;
