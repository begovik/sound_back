// const Pool = require('pg').Pool
import pg from 'pg'
const Pool = pg.Pool

// Тутэчки ключи должны называться именно так
const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5433,
    database: "dev"
})

export default pool