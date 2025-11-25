import { Pool } from 'pg';

let pool;

if (!global._pgPool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // For some managed Postgres providers you may need ssl: { rejectUnauthorized: false }
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
  });
  global._pgPool = pool;
} else {
  pool = global._pgPool;
}

export default pool;
