const { Pool } = require('pg');
const password = require('./password.js');

if (!process.env.PGDATABASE) {
    throw new Error('No PGDATABASE configured')
};

const db = new Pool({
    password: password
});

module.exports = db;