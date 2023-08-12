import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/useCases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymsQuerySchema.parse(request.query); // Parse fazer igual um throw Error se falhar, para por aqui

  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gym } = await searchGymsUseCase.execute({
    query: q,
    page,
  });

  return reply.status(200).send({
    gym,
  });
}
