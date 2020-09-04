const express = require('express');

const router = express.Router();

router.get('/list', (req, res, next) => {

})

router.post('/create', (req, res, next) => {
});

router.get('/read/:recordId', (req, res, next) => {
    res.send(req.params);
})

router.put('/modify/:recordId', (req, res, next) => {
    res.send(req.params);
});

router.delete('/remove/:recordId', (req, res, next) => {
    res.send(req.params);
});

module.exports = router;