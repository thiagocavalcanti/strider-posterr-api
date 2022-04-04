import { config as envConfig } from "dotenv"
envConfig()
import { dbClient } from "../src/application/config/database";
import * as fs from "fs";

const migration = async () => {
    const migrationQuery = fs.readFileSync(__dirname + "/scripts/v1__0__0__createTables.sql", { encoding: "utf-8" });
    const client = await dbClient()
    try {
        await client.query(migrationQuery)
        console.debug("Migrated with success")
    } finally {
        await client.release()
    }
}

const seed = async () => {
    await migration()
    const seedQuery = fs.readFileSync(__dirname + "/seeding.sql", { encoding: "utf-8" });
    const client = await dbClient()
    try {
        await client.query(seedQuery)
        console.debug("Seed with sucess")
    } finally {
        await client.release()
        process.exit(0)
    }

}
seed()