import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/useCases/register'
import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/useCases/errors/user-already-exists'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodyShema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodyShema.parse(request.body) // Parse fazer igual um throw Error se falhar, para por aqui

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
