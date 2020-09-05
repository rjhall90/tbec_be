const express = require('express');
const router = express.Router();

const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

// /api/list
// Get all records
router.get('/list', (req, res, next) => {
    client
        .query(`SELECT * FROM get_records();`)
        .then(resp => res.send({ message: `Found ${resp.rows.length} rows`, data: resp.rows }))
        .catch(err => res.status(500).send(err));
});

// /api/create
// Create a new record
router.post('/create', (req, res, next) => {
    if (!req.body.value1 || !req.body.value2 || typeof req.body.value3 === 'undefined') return res.status(400).send({ message: 'All three values must be provided to complete this request' });
    client
        .query(`SELECT * FROM insert_record('${req.body.value1}',${req.body.value2},${req.body.value3});`)
        .then(resp => res.send({ message: `New row created`, data: resp.rows }))
        .catch(err => res.status(500).send(err));
});

// /api/red/:recordId
// Get a specific record by id
router.get('/read/:recordId', (req, res, next) => {
    client
        .query(`SELECT * FROM get_record(${req.params.recordId});`)
        .then(resp => {
            if (resp.rows.length > 0)
                res.send({ message: `Row for ID ${req.params.recordId} found`, data: resp.rows });
            else
                res.status(404).send({ message: `No row exists for ID ${req.params.recordId}` });
        })
        .catch(err => res.status(500).send(err));
});

// /api/modify/:recordId
// Update a record with new parameters
router.put('/modify/:recordId', (req, res, next) => {
    if (!req.body.value1 || !req.body.value2 || typeof req.body.value3 === 'undefined') return res.status(400).send({ message: 'All three values must be provided to complete this request' });
    client
        .query(`SELECT * FROM update_record(${req.params.recordId},'${req.body.value1}',${req.body.value2},${req.body.value3});`)
        .then(resp => {
            if (resp.rows.length > 0)
                res.send({ message: `Row for ID ${req.params.recordId} updated`, data: resp.rows });
            else
                res.status(404).send({ message: `No row exists for ID ${req.params.recordId}` });
        })
        .catch(err => res.status(500).send(err));
});

router.delete('/remove/:recordId', (req, res, next) => {
    client
        .query(`SELECT * FROM delete_record(${req.params.recordId});`)
        .then(resp => {
            if (resp.rows.length > 0)
                res.send({ message: `Row for ID ${req.params.recordId} deleted`, data: resp.rows });
            else
                res.status(404).send({ message: `No row exists for ID ${req.params.recordId}` });
        })
        .catch(err => res.status(500).send(err));
});

module.exports = router;