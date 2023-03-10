const { JWT_SECRET } = process.env;

import express from "express";
const router = express.Router();

import bodyParser from "body-parser";
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

import { controllers } from "./controllers/index.js";
import { authenticate } from "./auth.js";

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET token");
}
const confirmToken = authenticate(JWT_SECRET);

//router.post("/auth", authenticate);
router.get("/alive", controllers.ping);
router.post("/user", controllers.signup);
router.post("/login", controllers.signin);

router.post("/maze", confirmToken, controllers.createMaze);
router.get("/maze/:mazeId/solution", confirmToken, controllers.getSolution);
router.get("/maze", confirmToken, controllers.getMaze);

router.all("/*", controllers.fallback);
router.use((error, _, res, __) => {
  console.error(`Processing err: ${error}`);
  return res.status(500).json({ error: "Processing error" });
});

export default router;
