import { sql } from 'bun'

interface SimpleWhere {
  [key: string]: unknown
}

interface SimpleQuery {
  where?: SimpleWhere
}
export function query() {

}

export function getUser(id?: number) {
  return sql`SELECT * FROM users WHERE id = ${id}`
}
