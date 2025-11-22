import express, { Application } from "express";
import notFoundRoute from "./app/middleware/notFoundRoute";
const app: Application = express();
import cors from "cors";
import router from "./app/routes";

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// not found route
app.use(notFoundRoute);

export default app;
