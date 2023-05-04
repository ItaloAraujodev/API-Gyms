import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('Should hash user password upon registration', async () => {
    const registerUserCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUserCase.execute({
      name: 'Italo Araujo',
      email: 'italoarauju258@gmail.com',
      password: '123456789',
    })

    const isPasswordCorrectLyHashed = await compare(
      '123456789',
      user.password_hash,
    )

    expect(isPasswordCorrectLyHashed).toBe(true)
  })
})
