const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')
const { defineConfig } = require('prisma/config')

module.exports = defineConfig({
  schema: 'prisma/schema.prisma',
  migrate: {
    adapter(env) {
      const pool = new Pool({ connectionString: env.DATABASE_URL })
      return new PrismaPg(pool)
    },
  },
})