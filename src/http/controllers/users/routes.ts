import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { register } from "./register";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated

  /**
   * Executa antes do profile
   * onRequest: Passa o request e o reply para dentro do verifyJWT para garantir que o verifyJWT Existe
   */

  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
