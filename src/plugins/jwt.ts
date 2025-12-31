import { jwt } from '@elysiajs/jwt'
import { Elysia, t } from 'elysia'

export default new Elysia()
  .use(jwt({
    alg: 'HS256', // 算法，默认 HS256，生产推荐 HS512 或 RS256
    exp: '15m', // 过期时间，支持 '7d'、'1h' 等
    name: 'jwt', // 自定义注入名称，默认 'jwt'
    secret: import.meta.env.JWT_SECRET, // 必须从环境变量读取
  }))
  .derive(({ headers }) => {
    const auth = headers.Authorization

    return {
      bearer: auth?.startsWith('Bearer ') ? auth.slice(7) : null,
    }
  })
  .guard({
    as: 'scoped',
    headers: t.Object({
      Authorization: t.String({ pattern: `/^Bearer /` }),
    }),
  })
