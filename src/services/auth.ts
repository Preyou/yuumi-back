import { Elysia, status, t } from 'elysia'
import { pg } from '@/db'
import { userDTO } from '@/models'
import formatResponse, { responseDTO } from '@/plugins/formatResponse'
import jwt from '@/plugins/jwt'

export default (prefix: string) => new Elysia({
  name: 'router-auth',
})
  .use(jwt)
  .use(formatResponse)
  .group(
    prefix,
    {
      body: t.Pick(userDTO.all, ['password']),
      detail: {
        tags: ['auth'],
      },
    },
    app =>
      app
        .post(
          '/register',
          async ({ body }) => {
            await pg.db.insert(pg.schemas.tables.users).values(body)
            return status(201, {
              data: true,
              message: '注册成功',
            })
          },
          {
            async beforeHandle({ body }) {
              body.password = await Bun.password.hash(body.password)
            },
            body: userDTO.insert,
            response: {
              201: responseDTO(t.Boolean()),
            },
          },
        )
        .group('/sign', app => app
          .post('/email', async ({ body, jwt, status }) => {
            const user = await pg.db.query.users.findFirst({
              where(fields, { eq }) {
                return eq(fields.email, body.email)
              },
            })
            if (!user) {
              return status(400, {
                data: null,
                message: '用户名或密码错误',
              })
            }
            return await Bun.password.verify(body.password, user.password)
              ? status(200, {
                  data: {
                    token: await jwt.sign({
                      id: user.id,
                    }),
                  },
                  message: '登录成功',
                })
              : status(401, {
                  data: null,
                  message: '用户名或密码错误',
                })
          }, {
            body: t.Object({
              email: t.String(),
              password: t.String(),
            }),
            response: {
              200: responseDTO(t.Object({
                token: t.String(),
              })),
              400: responseDTO(t.Null()),
              401: responseDTO(t.Null()),
            },
          })),
  )
