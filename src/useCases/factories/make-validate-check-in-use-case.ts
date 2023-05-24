import { PrismaCheckInsRepository } from '@/repositories/Prisma/prisma-check-ins-repository'
import { ValidadeCheckInUseCase } from '../validate-check-in'

export function makeValidadeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidadeCheckInUseCase(checkInsRepository)

  return useCase
}
