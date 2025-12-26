import { sql } from 'bun'

export function getUser(id?: number) {
  return sql`SELECT * FROM users WHERE id = ${id}`
}
