import type { TSchema } from 'elysia'
import { Elysia, t } from 'elysia'

export function success<D = unknown>(data: D, message = 'success') {
  return {
    data,
    message,
  }
}

export function error<E = unknown>(data: E, error = new Error('unknown error')) {
  return {
    data,
    message: error.message,
  }
}

const app = new Elysia({
  name: 'response-format',
})
  .as('scoped')
  .model({
    'response.format': t.Object({
      data: t.Unknown(),
      message: t.String(),
    }),
  })
  .guard({
    as: 'scoped',
    response: {
      // 200: 'response.format',
    },
    // schema: 'standalone',
  })
  .onError((context) => {
    console.log(context.error)

    return error(context.error)
  })

export function response200(schema: TSchema) {
  return t.Composite([t.Pick(app.models['response.format'].Schema(), ['message']), t.Object({
    data: schema,
  })])
}

export default app
