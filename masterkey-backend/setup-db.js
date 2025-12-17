import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Client } = require('pg');

const config = {
    user: 'postgres',
    password: '12/jan/5002',
    host: 'localhost',
    port: 5432,
    database: 'postgres', // Connect to default db first
};

const client = new Client(config);

async function setup() {
    try {
        await client.connect();
        console.log('Connected to postgres database.');

        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'masterkey'");
        if (res.rowCount === 0) {
            console.log('Database masterkey does not exist. Creating...');
            await client.query('CREATE DATABASE masterkey');
            console.log('Database masterkey created.');
        } else {
            console.log('Database masterkey already exists.');
        }
    } catch (err) {
        console.error('Error setting up database:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

setup();
