import { Pool } from 'pg';

export const DatabaseProvider = {
  provide: 'PG_POOL',
  useFactory: () => {
    return new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    });
  },
};
