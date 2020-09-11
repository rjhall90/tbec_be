const express = require('express');
const router = express.Router();

const db = require('../db');

// const { Client } = require('pg');
// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
// client.connect();

// /api/list
// Get all records
router.get('/list', (req, res, next) => {
    db.getAllRecords((err, resp) => {
        if (err) return next(err);
        else return res.send({ message: `Found ${resp.rows.length} rows`, data: resp.rows });
    });
});

// /api/create
// Create a new record
router.post('/create', (req, res, next) => {
    if (!req.body.timestamp || !req.body.value1 || !req.body.value2 || typeof req.body.value3 === 'undefined') return res.status(400).send({ message: 'Timestamp and all three values must be provided to complete this request' });
    db.createRecord(
        req.body.timestamp,
        req.body.value1,
        req.body.value2,
        req.body.value3,
        (err, resp) => {
            if (err) return next(err);
            else return res.send({ message: `New row created`, data: resp.rows });
        });
});

// /api/red/:recordId
// Get a specific record by id
router.get('/read/:recordId', (req, res, next) => {
    db.getSingleRecord(req.params.recordId, (err, resp) => {
        if (err) return next(err);
        else if (resp.rows.length > 0) return res.send({ message: `Row for ID ${req.params.recordId} found`, data: resp.rows });
        else res.status(404).send({ message: `No row exists for ID ${req.params.recordId}` });
    });
});

// /api/modify/:recordId
// Update a record with new parameters
router.put('/modify/:recordId', (req, res, next) => {
    if (!req.body.value1 || !req.body.value2 || typeof req.body.value3 === 'undefined') return res.status(400).send({ message: 'All three values must be provided to complete this request' });
    db.modifyRecord(
        req.params.recordId,
        req.body.value1,
        req.body.value2,
        req.body.value3,
        (err, resp) => {
            if (err) return next(err);
            else if (resp.rows.length > 0) return res.send({ message: `Row for ID ${req.params.recordId} updated`, data: resp.rows });
            else return res.status(404).send({ message: `No row exists for ID ${req.params.recordId}` });
        });
});

// /api/remove/:recordId
// Delete a specific record by id
router.delete('/remove/:recordId', (req, res, next) => {
    db.deleteRecord(req.params.recordId, (err, resp) => {
        if (err) return next(err);
        else if (resp.rows.length > 0) return res.send({ message: `Row for ID ${req.params.recordId} deleted`, data: resp.rows });
        else return res.status(404).send({ message: `No row exists for ID ${req.params.recordId}` });
    });
});

module.exports = router;