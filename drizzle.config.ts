import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dbCredentials: {
    url: import.meta.env.DATABASE_URL, // 只用环境变量
    // 或分开写：host, port, user: process.env.DB_USER, password: process.env.DB_PASSWORD 等
  },
  dialect: 'postgresql', // 或 "mysql" / "sqlite"
  schema: './src/db/pg/schemas/*.ts',
})
