const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    // Double up the connection pool
    max: 20
});

exports.getAllRecords = (callback) => {
    pool.query('SELECT * FROM get_records();', [], callback);
};

exports.getSingleRecord = (id, callback) => {
    pool.query('SELECT * FROM get_record($1::int);', [id], callback);
};

exports.createRecord = (timestamp, value1, value2, value3, callback) => {
    pool.query('SELECT * FROM insert_record($1, $2, $3, $4)', [timestamp, value1, value2, value3], callback);
};

exports.modifyRecord = (id, value1, value2, value3, callback) => {
    pool.query('SELECT * FROM update_record($1,$2,$3,$4)', [id, value1, value2, value3], callback)
};

exports.deleteRecord = (id, callback) => {
    pool.query('SELECT * FROM delete_record($1);', [id], callback);
};