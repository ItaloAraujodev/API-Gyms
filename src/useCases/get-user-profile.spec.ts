import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryRepository;
let sut: GetUserProfileUseCase;

describe("Get User profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("Should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Italo Araujo",
      email: "italoarauju258@gmail.com",
      password_hash: await hash("123456789", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("Italo Araujo");
  });

  it("Should not be able to get user profile wih  wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
