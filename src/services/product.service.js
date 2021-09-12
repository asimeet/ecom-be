const express = require('express');
const config = require('../../config');
const sharedMiddlewares = require('../lib/commons').middlewares;
const mockData = require('../mock-data/product');
const app = express();

/** use middle wares, making all API secured with internal API KEY */
app.use(express.json());
app.use(sharedMiddlewares.makeSecured);

/** Mange routes */
app.get('/', (req, res) => {
    res.status(200).send("Welcome to Product service");
});

app.get('/info/:id', (req, res) => {
    /**
     * With real time data it should get data from database
     * from a collection called 'ProductInfo' and fetch results
     * where productId === req.params.id
     */
    res.status(200).json(mockData.info);
});

app.get('/items/:id', (req, res) => {
    /**
     * With real time data it should get data from database
     * from a collection called 'ProductItems' and fetch results
     * where productId === req.params.id
     * 
     * A Product item is envisoned to be a variant of product which
     * has a unique combindation fo productId, color and size
     * They can have different prices
     */
    res.status(200).json(mockData.items);
});

app.get('/ratings/:id', (req, res) => {
    /**
     * With real time data it should get data from database
     * from a collection called 'ProductRatings' and fetch results
     * where productId === req.params.id
     */
    res.status(200).json(mockData.ratings.ratings);
});

/**
 *  Listen to config post
 */
app.listen(config.PRODUCT_PORT, () => {
    console.log(`Product service is running at port: ${config.PRODUCT_PORT}`);
});

/**
 * Catching all errors centrally
 */
app.use(sharedMiddlewares.catchServerError);