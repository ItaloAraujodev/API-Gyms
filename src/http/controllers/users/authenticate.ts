import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialError } from "@/useCases/errors/invalid-credentials-error";
import { makeAuthenticate } from "@/useCases/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body); // Parse fazer igual um throw Error se falhar, para por aqui

  try {
    const authenticateUseCase = makeAuthenticate();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/", // Todo o back end pode ler esse valor do cokkie
        secure: true, // Vai ser criptografado atraves do HTTPS, independete se ta usando HTTPs ou não
        sameSite: true, // Esse cookie so vai ser acessado no mesmo dominimo do site
        httpOnly: true, // Vai ser acessado só pelo backEnd e não pelo front end
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
