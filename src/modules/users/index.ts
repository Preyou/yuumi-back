import { Elysia, t } from 'elysia'
import { pg } from '@/db'
import formatResponse from '@/plugins/formatResponse'
import model from './model.js'

export default (prefix: string) => new Elysia({
  name: 'router-user',
})
  .use(model)
  .use(formatResponse)
  .group(
    prefix,
    app =>
      app.post(
        '/register',
        async ({ body }) => {
          await pg.db.insert(pg.schemas.tables.users).values(body)
          return true
        },
        {
          body: 'user.insert',
          // response: t.Boolean(),
        },
      )
        .get(
          '/user:id',
          async ({ params }) => {
            return (await pg.db.query.users.findFirst({
              where(fields, { eq }) {
                return eq(fields.id, params.id)
              },
            }))!
            // return {}
          },
          {
            params: t.Object({
              id: t.Number(),
            }),
            response: 'user.info',
            successMsg(...args) {
              // console.log(args)
              return '123'
            },
          },
        ),
  )
