import { MongoClient } from "mongodb";
const connectionString = process.env.MONGO_URI || "";

console.log("connectionString", connectionString);

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

let db = conn.db("local");

export default db;
