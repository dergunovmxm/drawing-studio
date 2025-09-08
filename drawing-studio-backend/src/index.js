import express from "express";
import cors from "cors";
import galleryRoute from "./routes/galleryRoute.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", galleryRoute);

app.listen(port, () => {
  console.log("listen port 3000");
});
