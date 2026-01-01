import { createSelectSchema } from 'drizzle-typebox'
import { t } from 'elysia'
import { pg } from '@/db'

const __select = createSelectSchema(pg.schemas.tables.permissions)

export const all = t.Object({
  ...__select.properties,
  id: t.Number(),
})

export const insert = t.Omit(all, ['id', 'createdAt', 'updatedAt'])

export const update = t.Partial(insert)

export const select = all
