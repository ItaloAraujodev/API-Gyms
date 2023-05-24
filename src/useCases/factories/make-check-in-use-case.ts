import { PrismaGymsRepository } from '@/repositories/Prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../checkin'
import { PrismaCheckInsRepository } from '@/repositories/Prisma/prisma-check-ins-repository'

export function makeCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
