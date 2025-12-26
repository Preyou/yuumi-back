import { openapi } from '@elysiajs/openapi'
import { Elysia } from 'elysia'
import test from '@/modules/test'

console.log(import.meta.env)

const app = new Elysia()
  .use(test)
  .use(openapi())
  .get('/', () => 'Hello Elysia')
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
