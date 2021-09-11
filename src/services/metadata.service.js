const express = require('express');
const config = require('../../config');
const sharedMiddlewares = require('../lib/commons').middlewares;
const app = express();
const mockData = require('../mock-data/metadata');


/** use middle wares */
app.use(express.json());
app.use(sharedMiddlewares.makeSecured);

/** Mange routes */

app.get('/', (req, res) => {
    res.status(200).send("Welcome to Metadata service");
});

app.get('/product-info/:id', (req,res) => {
    res.status(200).json(mockData.productInfo);
});

app.listen(config.METADATA_PORT, () => {
    console.log(`Metadata service is running at port: ${config.METADATA_PORT}`);
});

app.use(sharedMiddlewares.catchServerError);