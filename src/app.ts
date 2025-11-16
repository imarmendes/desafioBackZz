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

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware global de erros
app.use(errorHandler);

export default app;
