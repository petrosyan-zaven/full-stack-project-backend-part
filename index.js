const PORT = 5000;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');


module.exports = { PORT, sqlite3, db }