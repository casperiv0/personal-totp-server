import express, { json } from "express";
import { apiRouter } from "./routes/api";

import helmet from "helmet";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

const app = express();

app.use(cookieParser());
app.use(json());
app.use(helmet());
app.use(compression());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/v1", apiRouter, csurf({ cookie: true }));

app.disable("x-powered-by");
app.listen(parseInt(process.env["API_PORT"]!), () => console.log("ONLINE!"));

// function generateOne() {

//   totp.options = { digits: 6 };

//   const token = authenticator.generate(SECRET);
//   console.log(token);
// }
// generateOne();
