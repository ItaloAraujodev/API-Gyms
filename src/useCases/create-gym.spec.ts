import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  // beforeEach server para executar o codigo antes de cada testes

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('Should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym_01',
      description: null,
      phone: null,
      latitude: -9.4117255,
      longitude: -36.6358062,
    })

    expect(gym.id).toEqual(expect.any(String)) // Eu espero que o id do user seja igual a qualquer string
  })
})
