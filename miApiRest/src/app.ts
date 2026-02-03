import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { AppDataSource } from "./data-source";
import { STATUS_CODES } from "node:http";
import { ok } from "node:assert";
import routes from "./routes";

AppDataSource.initialize()
  .then(async () => {
    const app: Application = express();
    app.use(express.json());
    app.use(cors());
    app.use(helmet());

    const PORT = process.env.PORT || 3000;

    app.use("/api", routes);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // app.get("/", (req, res) => {
    //   res.send({ STATUS_CODES: 200, ok: true, message: "API REST is running" });
    // });
  })
  .catch((error) => console.log(error));
