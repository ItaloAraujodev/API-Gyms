import { beforeEach, expect, describe, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search.gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  // beforeEach server para executar o codigo antes de cada testes

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -9.4117255,
      longitude: -36.6358062,
    })

    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -9.4117255,
      longitude: -36.6358062,
    })

    const { gym } = await sut.execute({
      query: 'TypeScript',
      page: 1,
    })

    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'TypeScript Gym' })])
  })

  it('Should be able to fetch paginated user check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -9.4117255,
        longitude: -36.6358062,
      })
    }

    const { gym } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gym).toHaveLength(2)
    expect(gym).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
