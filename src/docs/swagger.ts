// src/docs/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zazuu Desafio API",
      version: "1.0.0",
      description: "Documentação da API (Auth e Products)",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // Ajuste os globs se necessário
  apis: [
    "src/app.ts",
    "src/api/routes/*.ts",
    "src/api/controllers/*.ts",
    "src/api/middlewares/*.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;