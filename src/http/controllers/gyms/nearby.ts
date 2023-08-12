import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymsUseCase } from "@/useCases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query); // Parse fazer igual um throw Error se falhar, para por aqui

  const fetchNearbyGyms = makeFetchNearbyGymsUseCase();

  const { gym } = await fetchNearbyGyms.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({
    gym,
  });
}
