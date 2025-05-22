//Archivo de conexión a la database intern_jobs
import pg from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, SUPABASE_URI } from './config.js';


//CONEXIÓN LOCAL, OJO ACTIVAR ESTA PARTE EN EL ENTREGABLE
export const pool = new pg.Pool({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
}); 

/*
//CONEXIÓN CLOUD
const { Pool } = pg;

export const pool = new Pool({
  connectionString: SUPABASE_URI,
  ssl: {
    rejectUnauthorized: false, // importante para Supabase
  },
});

pool.query('SELECT NOW()')
  .then(res => console.log('DB connected at:', res.rows[0].now))
  .catch(err => console.error('DB connection error:', err));
*/