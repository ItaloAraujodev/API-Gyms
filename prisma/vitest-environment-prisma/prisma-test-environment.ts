import "dotenv/config";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma",
  async setup() {
    // executa antes dos testes rodarem
    const schame = randomUUID();
    const dataBase = generateDataBaseURL(schame);

    process.env.DATABASE_URL = dataBase;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        console.log("Teardown");
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schame}" CASCADE`
        );
        await prisma.$disconnect();
      }, // Pode executar depois que os testes rodarem. Cada arquivo de testes
    };
  },
};
