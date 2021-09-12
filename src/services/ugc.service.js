const express = require('express');
const config = require('../../config');
const sharedMiddlewares = require('../lib/commons').middlewares;
const mockData = require('../mock-data/ugc');
const app = express();


/** use middle wares, making all API secured with internal API KEY */
app.use(express.json());
app.use(sharedMiddlewares.makeSecured);

/** Mange routes */

app.get('/', (req, res) => {
    res.status(200).send("Welcome to User Generated Content Service");
});

app.get('/product-images/:id', (req, res) => {
    /**
     * With real time data it should get data from database
     * from a collection called 'ProductImageUrls' and fetch results
     * where productId === req.params.id
     */
    res.status(200).json(mockData.imageUrls);
});

/**
 *  Listen to config post
 */
app.listen(config.UGC_PORT, () => {
    console.log(`User Generated Content Service is running at port: ${config.UGC_PORT}`);
});

/**
 * Catching all errors centrally
 */
app.use(sharedMiddlewares.catchServerError);