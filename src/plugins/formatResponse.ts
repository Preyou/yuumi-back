import type { TSchema } from 'elysia'
import { Elysia, t } from 'elysia'

export default <E extends Elysia> (app: E) => new Elysia({
  name: 'response-format',
})
  .macro('response', (response: TSchema | keyof E['models']) => {
    if (!response) {
      return
    }

    return {
      response: t.Object({
        code: t.Number(),
        // @ts-expect-error no error
        data: typeof response === 'string' ? app.models[response].Schema() : response,
        message: t.String(),
      }),
    }
  })
  .macro('aa', (a: boolean) => {})
  .macro('successMsg', (msg: string | ((context: Parameters<E['mapResponse']>[0]) => string)) => {
    return {
      mapResponse(context) {
        context.responseValue.message = typeof msg === 'string' ? msg : msg(context)
        console.log(context)
        return context.responseValue
      },
    }
  })
  .onAfterHandle(({ responseValue }) => {
    return {
      code: 0,
      data: responseValue,
      message: 'success',
    }
  })
  .as('scoped')
