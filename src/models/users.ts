import { createSelectSchema } from 'drizzle-typebox'
import { t } from 'elysia'
import { pg } from '@/db'

const age = t.Integer({ maximum: 200, minimum: 0 })
const email = t.String({ format: 'email' })

const __select = createSelectSchema(pg.schemas.tables.users, {
  age,
  email,
})

export const all = t.Object({
  ...__select.properties,
  id: t.Integer(),
})

export const insert = t.Omit(all, ['id', 'createAt', 'updateAt'])

export const update = t.Partial(insert)

export const select = t.Omit(all, ['password'])
