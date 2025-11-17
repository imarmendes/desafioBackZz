import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zazuu Desafio API",
      version: "1.0.0",
      description: "Documentação da API (Auth e Products)",
    },
    servers: [{ url: process.env.BASE_URL }],
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
  apis: [
    "src/app.ts",
    "src/api/routes/*.ts",
    "src/api/controllers/*.ts",
    "src/api/middlewares/*.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;