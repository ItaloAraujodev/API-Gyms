import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }); // Vai olhar para os cookies da nossa req, pra ver se existe

  const { role } = request.user;

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
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
}
