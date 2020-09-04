const express = require('express');
const helmet = require('helmet');

const requiredRoutes = require('./routes/required');

const app = express();

//app.use(helmet());

app.use('/api', requiredRoutes);

app.use((req, res, next) => {
    res.status(404).send({ 'error': 'Route not found' });
});

app.listen(3000);