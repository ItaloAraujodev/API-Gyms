import { env } from './env'
import { app } from './app'

app
  .listen({
    host: '0.0.0.0', // Evitar problmas ao connectar com o front end
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running!! Porta: ${env.PORT}`)
  })
