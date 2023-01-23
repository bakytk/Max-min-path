import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;
import express from "express";
const app = express();

import router from "./routes.js";
app.use("/", router);

app.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`);
});

export default app;
