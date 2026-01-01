import { jwt } from '@elysiajs/jwt'
import { Elysia, t } from 'elysia'
import { userDTO } from '@/models'

export default new Elysia()
  .use(jwt({
    alg: 'HS256', // 算法，默认 HS256，生产推荐 HS512 或 RS256
    exp: '15m', // 过期时间，支持 '7d'、'1h' 等
    name: 'jwt', // 自定义注入名称，默认 'jwt'
    schema: t.Pick(userDTO.select, ['id']),
    secret: import.meta.env.JWT_SECRET, // 必须从环境变量读取
  }))
  .macro({
    useAuth: {
      headers: t.Object({
        authorization: t.String({ pattern: `^Bearer ` }),
      }),
      async resolve({ headers, jwt, status }) {
        const token = headers.authorization?.startsWith('Bearer ') ? headers.authorization.slice(7) : undefined
        const auth = await jwt.verify(token)

        if (!token || !auth) {
          throw status(401)
        }
        return {
          auth,
          token,
        }
      },
    },
  })
  .as('scoped')
