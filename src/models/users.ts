import { createSelectSchema } from 'drizzle-typebox'
import { t } from 'elysia'
import { pg } from '@/db'

const age = t.Integer({ maximum: 200, minimum: 0 })
const email = t.String({ format: 'email' })

export const userDTO = createSelectSchema(pg.schemas.tables.users, {
  age,
  email,
})
