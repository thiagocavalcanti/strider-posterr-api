import { config as envConfig } from "dotenv"
envConfig()
import { dbClient } from "../src/application/config/database";
import * as fs from "fs";

const seed = async () => {
    const seedQuery = fs.readFileSync(__dirname + "/seeding.sql", { encoding: "utf-8" });
    const client = await dbClient()
    try{
        const res = await client.query(seedQuery)
        console.log("Seed with sucess")
    } finally{
        await client.release()
    }

}
seed()