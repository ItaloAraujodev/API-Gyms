import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUserCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
