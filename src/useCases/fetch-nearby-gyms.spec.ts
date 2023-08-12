import { beforeEach, expect, describe, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Use Case", () => {
  // beforeEach server para executar o codigo antes de cada testes

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("Should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gyms",
      description: null,
      phone: null,
      latitude: -9.4117255,
      longitude: -36.6358062,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -9.4011549,
      longitude: -36.9896796,
    });

    const { gym } = await sut.execute({
      userLatitude: -9.4117255,
      userLongitude: -36.6358062,
    });

    expect(gym).toHaveLength(1);
    expect(gym).toEqual([expect.objectContaining({ title: "Near Gyms" })]);
  });
});
