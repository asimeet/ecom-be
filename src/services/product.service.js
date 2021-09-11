const express = require('express');
const config = require('../../config');
const sharedMiddlewares = require('../lib/commons').middlewares;
const mockData = require('../mock-data/product');
const app = express();

/** use middle wares */
app.use(express.json());
app.use(sharedMiddlewares.makeSecured);

/** Mange routes */
app.get('/', (req, res) => {
    res.status(200).send("Welcome to Product service");
});

app.get('/info/:id', (req, res) => {
    res.status(200).json(mockData.info);
});

app.get('/specs/:id', (req, res) => {
    res.status(200).json(mockData.items);
});

app.get('/ratings/:id', (req, res) => {
    res.status(200).json(mockData.ratings.ratings);
});

app.listen(config.PRODUCT_PORT, () => {
    console.log(`Product service is running at port: ${config.PRODUCT_PORT}`);
});

app.use(sharedMiddlewares.catchServerError);