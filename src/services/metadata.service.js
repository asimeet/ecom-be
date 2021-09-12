const express = require('express');
const config = require('../../config');
const sharedMiddlewares = require('../lib/commons').middlewares;
const app = express();
const mockData = require('../mock-data/metadata');


/** use middle wares, making all API secured with internal API KEY */
app.use(express.json());
app.use(sharedMiddlewares.makeSecured);

/** Mange routes */

app.get('/', (req, res) => {
    res.status(200).send("Welcome to Metadata service");
});

app.get('/product-info/:id', (req,res) => {
    /**
     * With real time data it should get data from database
     * from a collection called 'ProductMetadata' and fetch results
     * where productId === req.params.id
     */
    res.status(200).json(mockData.productMeta);
});

/**
 *  Listen to config post
 */
app.listen(config.METADATA_PORT, () => {
    console.log(`Metadata service is running at port: ${config.METADATA_PORT}`);
});

/**
 * Catching all errors centrally
 */
app.use(sharedMiddlewares.catchServerError);