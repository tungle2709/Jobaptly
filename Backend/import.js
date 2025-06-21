const { MongoClient } = require('mongodb');
const fs = require('fs');

const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';
const collectionName = 'users';

async function run() {
                const client = new MongoClient(url);

                try {
                                await client.connect();
                                console.log('Connected to MongoDB');

                                const db = client.db(dbName);
                                const collection = db.collection(collectionName);

                                const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

                                const result = await collection.insertMany(data);
                                console.log(`${result.insertedCount} documents inserted`);
                } catch (err) {
                                console.error('Error:', err);
                } finally {
                                await client.close();
                }
}

run();
