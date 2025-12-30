import { Elysia, t } from 'elysia'
import { pg } from '@/db'
import formatResponse, * as response from '@/plugins/formatResponse'
import model from './model.js'

export default (prefix: string) => new Elysia({
  name: 'router-user',
})
  .use(model)
  .use(formatResponse)
  // .use(
  //   <E extends Elysia> (app) => new Elysia({
  //     name: 'response-format1',
  //   })
  //     .macro({
  //       hi: (word: string) => ({
  //         beforeHandle() {
  //           console.log(word)
  //         },
  //       }),
  //     }),
  // )

  .group(
    prefix,
    app =>
      app.post(
        '/register',
        async ({ body }) => {
          await pg.db.insert(pg.schemas.tables.users).values(body)
          return response.success(true)
        },
        {
          body: 'user.insert',
          // response: t.Boolean(),
        },
      )
        .get(
          '/user:id',
          async ({ params }) => {
            return response.success((await pg.db.query.users.findFirst({
              where(fields, { eq }) {
                return eq(fields.id, params.id)
              },
            }))!)
          },
          {
            params: t.Object({
              id: t.Number(),
            }),
            response: {
              200: response.response200(app.models['user.info'].Schema()),
            },
          },
        ),
  )
