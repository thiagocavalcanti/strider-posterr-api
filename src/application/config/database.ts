import { Pool } from 'pg'

/**
 * Creates a poll for postgresql database
 * It uses the following environment variables:
 * PGUSER = Postgres user
 * PGHOST = Postgres host
 * PGPASSWORD = Postgres password
 * PGDATABASE = Postgres database
 * PGPORT = Postgres port
 */
const pool = new Pool()

pool.on('error', (err, client) => {
  console.error(`Unexpected error on idle client ${client}`, err)
  process.exit(-1)
})

pool.connect((err, client, done) => {
  if (err) throw err
  client.query('SELECT NOW()', (err) => {
    done()
    if (err) {
      console.log(err.stack)
    } else {
      console.log("Connected to database with success!")
    }
  })
})

export const databaseHealthCheck = (currPoll) => {
  currPoll.query('SELECT NOW()', (err) => {
    if (err) {
      console.log(err.stack)
      return false
    } else {
      console.log("Database health ok")
      return true
    }
  })
}

export default pool