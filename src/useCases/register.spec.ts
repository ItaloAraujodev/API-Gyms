import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let usersRepository: InMemoryRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  // beforeEach server para executar o codigo antes de cada testes

  beforeEach(() => {
    usersRepository = new InMemoryRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Italo Araujo',
      email: 'italoarauju258@gmail.com',
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String)) // Eu espero que o id do user seja igual a qualquer string
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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

  it('Should not be able to register with same email twice', async () => {
    const email = 'jonjohon@gmail.com'

    await sut.execute({
      name: 'Italo Araujo',
      email,
      password: '123456789',
    })

    await expect(() =>
      sut.execute({
        name: 'Italo Araujo',
        email,
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
