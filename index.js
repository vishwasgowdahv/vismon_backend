import connectToDb from "./db.js";
import express from "express";
import authRoute from "./routes/authRoute.js";
import workRoute from "./routes/workRoute.js";
import cors from "cors";

const app = express();

connectToDb();
app.use(cors());

app.use(express.json());
app.use("/v1/api/auth", authRoute);
app.use("/v1/api/work", workRoute);
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(3000);
