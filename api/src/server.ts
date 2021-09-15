import express, { json } from "express";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes/api";

const app = express();

app.use(cookieParser());
app.use(json());
app.use("/api/v1", apiRouter);

app.disable("x-powered-by");
app.listen(parseInt(process.env["API_PORT"]!), () => console.log("ONLINE!"));

// function generateOne() {

//   totp.options = { digits: 6 };

//   const token = authenticator.generate(SECRET);
//   console.log(token);
// }
// generateOne();
