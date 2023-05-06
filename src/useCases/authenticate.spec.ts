import { expect, describe, it } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('Should be able to authenticate', async () => {
    const usersRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Italo Araujo',
      email: 'italoarauju258@gmail.com',
      password_hash: await hash('123456789', 6),
    })

    const { user } = await sut.execute({
      email: 'italoarauju258@gmail.com',
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String)) // Eu espero que o id do user seja igual a qualquer string
  })

  it('Should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'italoarauju258@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('Should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Italo Araujo',
      email: 'italoarauju258@gmail.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'italoarauju258@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
