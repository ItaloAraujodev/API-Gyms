import { CreateGymUseCase } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/Prisma/prisma-gyms-repository'

export function makeCreateGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
