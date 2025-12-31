import { openapi } from '@elysiajs/openapi'
import { Elysia } from 'elysia'
import authRouter from '@/services/auth'
import usersRouter from '@/services/users'

const app = new Elysia()
  .use(openapi())
  .use(authRouter('/auth'))
  .use(usersRouter('/users'))

  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
