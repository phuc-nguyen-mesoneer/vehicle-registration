import { MongoClient } from "mongodb";
const connectionString = process.env.MONGO_URI || "";

const client = new MongoClient(connectionString);

let conn;

try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
    throw e;
}

export default conn;
