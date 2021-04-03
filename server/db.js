const dbConfig = {
  user: process.env.USER,
  password: process.db.PASS,
  server: process.env.SERVER,
  database: process.env.DB,
  port: 1433,

  stream: false,
  pool: {
    max: 90,
    min: 0,
    idleTimeoutMillis: 900000,
  },
  requestTimeout: 0,
  connectionTimeout: 3000,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
}

module.exports = dbConfig
