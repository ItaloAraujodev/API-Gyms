import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    console.log("Setup"); // executa antes dos testes rodarem
    return {
      async teardown() {
        console.log("Teardown");
      }, // Pode executar depois que os testes rodarem. Cada arquivo de testes
    };
  },
};
