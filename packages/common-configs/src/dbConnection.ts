// defining the DB connection logic separatedly, to be reused in multiple apps.

import {Client} from 'pg'
import { DB_URL } from './config'

export async function ConnectToDB(){

    const pgClient = new Client({
        connectionString: DB_URL
    })

    try {
        await pgClient.connect();
        console.log("Database connected Successfully!");
        return pgClient;            // returning for further usage

    } catch (error) {
        console.error("Failed connecting to Database!");
        process.exit(1)
    }
}