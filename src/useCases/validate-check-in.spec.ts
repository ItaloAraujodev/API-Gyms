import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, expect, describe, it, afterEach } from 'vitest'
import { ValidadeCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidadeCheckInUseCase

describe('Validade Check-in Use Case', () => {
  // beforeEach server para executar o codigo antes de cada testes

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidadeCheckInUseCase(checkInsRepository)

    /* vi.useFakeTimers() */ // Usa data ficticias
  })

  // Depois de cada teste
  afterEach(() => {
    /* vi.useRealTimers() */
    // Reseta  deixa sem mock
  })

  it('should be able to validade the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validade an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
