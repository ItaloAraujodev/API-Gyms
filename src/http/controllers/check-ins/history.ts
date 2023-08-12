import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryUseCase } from "@/useCases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query); // Parse fazer igual um throw Error se falhar, para por aqui

  const searchGymsUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIn } = await searchGymsUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIn,
  });
}
