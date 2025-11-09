import express from "express"
import dotenv from "dotenv"
import chatRouter from "./routes/chatRoutes.js"
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api", chatRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
