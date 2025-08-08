import connectToMongo from "./db.js";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/auth.js";
import { noteRouter } from "./routes/note.js";
const app = express();
const port = process.env.APP_PORT;
connectToMongo();
app.use(express.json());
app.use(cors());
//available routes
app.use("/api/auth", userRouter);
app.use("/api/notes", noteRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
