import express from "express";
import cors from "cors";
import apiRoutes from "./routes/auth-routes.js"
import errorHandler from "./middlewares/error-handler-middleware.js";

const app = express();

app.use(cors())
app.use(express.json())

app.use("/auth", apiRoutes)

apiRoutes.use(errorHandler);
export default app;