import { join } from "path";
import SwaggerJSDOC from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Binar Car Rental",
    version: "1.0.0",
    description: "Binar Car Rental made by Mario",
    contact: {
      name: "Venansius Mario",
    },
  },
  components: {
    schemas: {
      Car: {
        type: "object",
        properties: {
          plate: {
            type: "string",
          },
          manufacture: {
            type: "string",
          },
          model: {
            type: "string",
          },
          image: {
            type: "string",
          },
          rentPerDay: {
            type: "integer",
          },
          capacity: {
            type: "integer",
            minimum: 1,
          },
          description: {
            type: "string",
          },
          availableAt: {
            type: "string",
            format: "date-time",
          },
          transmission: {
            type: "string",
          },
          available: {
            type: "boolean",
          },
          type: {
            type: "string",
          },
          year: {
            type: "integer",
          },
          options: {
            type: "array",
            items: {
              type: "string",
            },
          },
          specs: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = SwaggerJSDOC(options);
