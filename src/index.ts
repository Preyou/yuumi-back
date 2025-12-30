import { openapi } from '@elysiajs/openapi'
import { Elysia } from 'elysia'
import usersRouter from '@/modules/users'

const app = new Elysia()
  .use(openapi())
  .use(usersRouter('/users'))
  // .get('/', () => 'Hello Elysia', {
  //   //
  // })
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
