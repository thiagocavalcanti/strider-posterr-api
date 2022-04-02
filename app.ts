import { config as envConfig } from "dotenv"
envConfig()
const express = require('express');
import _, { dbClient, databaseHealthCheck } from "./src/application/config/database"


const app = express()
app.get('/health', (_, res) => {
    databaseHealthCheck(dbClient())
    res.send('Hello World!')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
