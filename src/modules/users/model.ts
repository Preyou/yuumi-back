import { Elysia, t } from 'elysia'

import { pg, spreads } from '@/db'

const tablesSelect = spreads(pg.schemas.tables, 'select')
const tablesInsert = spreads(pg.schemas.tables, 'insert')
export default new Elysia({
  name: 'model-user',
})
  .model({
    'user.info': t.Omit(t.Object(tablesSelect.users), ['password']),
    'user.insert': t.Object(tablesInsert.users),
  })
