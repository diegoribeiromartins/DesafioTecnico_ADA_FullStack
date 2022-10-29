import { Router } from "express";
import { CardsController } from "../controllers";

const CardRoutes = Router();

CardRoutes.get("/", CardsController.get);
CardRoutes.post("/", CardsController.create);
CardRoutes.put("/:id", CardsController.update);
CardRoutes.delete("/:id", CardsController.delete);

export { CardRoutes };
