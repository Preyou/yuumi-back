import type { TSchema } from 'elysia'
import { Elysia, t } from 'elysia'

export function format<D = unknown>(data: D, message = '') {
  return {
    data,
    message,
  }
}

const responseFormat = t.Object({
  data: t.Unknown(),
  message: t.String(),
})

export default new Elysia({
  name: 'response-format',
})
  .model({
    'response.format': responseFormat,
  })
  .guard({
    response: {
      500: 'response.format',
    },
    // schema: 'standalone',
  })
  .onError((context) => {
    return context.status(500, {
      data: context.error,
      message: context.code.toString(),
    })
  })
  .as('scoped')

export function responseDTO<TS extends TSchema>(schema: TS) {
  return t.Object({
    data: schema,
    message: t.String(),
  })
}
