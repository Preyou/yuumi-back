import { Elysia, t } from 'elysia'

export default new Elysia()
  .get(
    '/aa:a',
    () => ({
      aa: new Date(),
    }),
    {
      params: t.Object({
        a: t.String({
          enum: ['a', 'b'],
        }),
        b: t.Optional(t.Boolean()),
      }),
      response: t.Object({
        aa: t.Date(),
      }),
    },
  )
  .post(
    '/bb',
    () => {
      return {
        data: 1,
        message: 'bb',
      }
    },
    {
      body: t.Object({
        f: t.File(),
      }),
    },
  )
  .put(
    '/put',
    (context) => {
      return context
    },
    {
      query: t.Array(t.String()),
    },
  )
  .delete(
    'delete',
    () => {
      return true
    },
    {
      body: t.Object({
        f: t.File(),
      }),
      cookies: t.Object({
        session_id: t.String(),
      }),
      headers: t.Object({
        a: t.String(),
        b: t.Optional(t.Boolean()),
      }),
      params: t.Object({
        a: t.String(),
        b: t.Optional(t.Boolean()),
      }),
      query: t.Array(t.String()),
    },
  )
