import express from "express";
import cors from "cors";
import { json } from "body-parser";

import authRoutes from "./api/routes/authRoutes";
import productRoutes from "./api/routes/productRoutes";

import { errorHandler } from "./api/middlewares/errorHandler";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
