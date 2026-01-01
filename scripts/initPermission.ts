import type { OpenAPI3 } from 'openapi-typescript'
import type { permissionDTO } from '@/models'
import axios from 'axios'
import { pg } from '@/db'

const { data: openapi } = await axios.get<OpenAPI3>(import.meta.env.OPENAPI_URL)

if (openapi.paths) {
  const permissions = Object.entries(openapi.paths).map(([path, methods]) => Object.entries(methods).map(([method, { operationId, summary, tags }]) => ({
    method,
    name: operationId,
    path,
    summary,
    tags,
  } as typeof permissionDTO.insert.static))).flat()

  // const permissionsDB = await pg.db.query.permissions.findMany()

  // console.log(permissions, permissionsDB)

  await pg.db.insert(pg.schemas.tables.permissions)
    .values(permissions)
    .onConflictDoNothing()
}
