import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateGymsUseCase } from "@/useCases/factories/make-create-gym-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().email(),
    phone: z.string().min(6),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { description, latitude, longitude, phone, title } =
    createGymBodySchema.parse(request.body); // Parse fazer igual um throw Error se falhar, para por aqui

  const createGymUseCase = makeCreateGymsUseCase();

  await createGymUseCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  });

  return reply.status(201).send();
}
