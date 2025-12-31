import { Elysia, status, t } from 'elysia'
import { pg } from '@/db'
import { userDTO } from '@/models/users'
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
    },
    app =>
      app.guard(
        {
          beforeHandle({ jwt }) {
            jwt.verify()
          },
          params: t.Object({
            id: t.Integer(),
          }),
        },
        app =>
          app.get(':id', () => {}),
      ),

  )
