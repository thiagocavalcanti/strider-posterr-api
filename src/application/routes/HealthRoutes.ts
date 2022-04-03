import { databaseHealthCheck, dbClient } from "../config/database"

export default (server) => {
    server.get('/health', (_, res) => {
        databaseHealthCheck(dbClient())
        res.send()
    })
} 
