import { SQL } from 'bun'
import { drizzle } from 'drizzle-orm/bun-sql'
import * as schemas from './schemas'

const client = new SQL(import.meta.env.DATABASE_URL)
export default drizzle({ client, schema: { ...schemas.tables, ...schemas.relations } })
