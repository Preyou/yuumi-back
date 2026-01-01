declare module 'bun' {
  interface Env {
    DATABASE_URL: string
    JWT_SECRET: string

    OPENAPI_URL: string
  }
}
