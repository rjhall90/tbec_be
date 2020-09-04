const express = require('express');
const helmet = require('helmet');
require('dotenv').config({ path: __dirname + './.env' });

const requiredRoutes = require('./routes/required');

const app = express();

//app.use(helmet());

app.use('/api', requiredRoutes);

app.use((req, res, next) => {
    res.status(404).send({ 'error': 'Route not found' });
});
console.log("Env Port: " + process.env.PORT);
app.listen(process.env.PORT);