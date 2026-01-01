import { Elysia, status, t } from 'elysia'
import { pg } from '@/db'
import { userDTO } from '@/models'
import formatResponse, { responseDTO } from '@/plugins/formatResponse'
import jwt from '@/plugins/jwt'

export default (prefix: string) => new Elysia({
  name: 'router-users',
})
  .use(jwt)
  .use(formatResponse)
  .group(
    prefix,
    {
      detail: {
        tags: ['users'],
      },
      useAuth: true,
    },
    app =>
      app
        .get('/user/:id', async ({ params, status }) => {
          const user = await pg.db.query.users.findFirst({
            where(fields, operators) {
              return operators.eq(fields.id, params.id)
            },
          })
          if (!user) {
            return status(404, {
              data: null,
              message: '用户不存在',
            })
          }
          return status(200, {
            data: user,
            message: 'success',
          })
        }, {
          params: t.Object({
            id: t.Integer(),
          }),
          response: {
            200: responseDTO(userDTO.select),
            404: responseDTO(t.Null()),
          },
        })
        .get('/me', async ({ auth }) => {
          const user = await pg.db.query.users.findFirst({
            where(fields, operators) {
              return operators.eq(fields.id, auth.id)
            },
          })

          return status(200, {
            data: user!,
            message: 'success',
          })
        }, {
          response: {
            200: responseDTO(userDTO.select),
          },
        }),
  )
