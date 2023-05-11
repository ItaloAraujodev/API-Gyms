import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(userId: string) {
    const gym = this.items.find((user) => user.id === userId)

    if (!gym) {
      return null
    }

    return gym
  }
}
