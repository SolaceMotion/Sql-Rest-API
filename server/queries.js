const sql = require('mssql')
const dbConfig = require('./db')

const pool = new sql.ConnectionPool(dbConfig)
pool.connect()
let coreDB = {}

coreDB.all = () => {
  return new Promise((resolve, reject) => {
    pool
      .query('SELECT * FROM TasksTbl')
      .then(recordset => resolve(recordset))
      .catch(err => reject(err))
  })
}

coreDB.one = id => {
  const request = new sql.Request(pool)
  return new Promise((resolve, reject) => {
    request.input('id', sql.Int, id)
    request.query(
      `SELECT * FROM TasksTbl WHERE taskid = @id`,
      (err, recordset) => {
        if (err) {
          return reject(err)
        }
        return resolve(recordset)
      }
    )
  })
}

coreDB.insert = value => {
  const request = new sql.Request(pool)
  return new Promise((resolve, reject) => {
    request.input('value', sql.NVarChar, value)
    request.query(
      'INSERT INTO TasksTbl(tasks) VALUES(@value)',
      (err, recordset) => {
        if (err) {
          return reject(err)
        }
        return resolve(recordset)
      }
    )
  })
}

coreDB.update = (id, name) => {
  const request = new sql.Request(pool)
  return new Promise((resolve, reject) => {
    request.input('id', sql.Int, id)
    request.input('name', sql.VarChar, name)
    request.query(
      `UPDATE TasksTbl SET tasks = @name WHERE taskid = @id`,
      (err, recordset) => {
        if (err) {
          return reject(err)
        }
        return resolve(recordset)
      }
    )
  })
}

coreDB.delete = id => {
  const request = new sql.Request(pool)
  return new Promise((resolve, reject) => {
    request.input('id', sql.Int, id)
    request.query(
      `DELETE FROM TasksTbl WHERE taskid = @id`,
      (err, recordset) => {
        if (err) {
          return reject(err)
        }
        return resolve(recordset)
      }
    )
  })
}

module.exports = coreDB
