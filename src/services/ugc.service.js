const express = require('express');
const config = require('../../config');
const sharedMiddlewares = require('../lib/shared-middlewares');
const mockData = require('../mock-data/ugc').imageUrls;
const app = express();


/** use middle wares */
app.use(express.json());
app.use(sharedMiddlewares.makeSecured);

/** Mange routes */

app.get('/', (req, res) => {
    res.status(200).send("Welcome to User Generated Content Service");
});

app.get('/product-images/:id', (req, res) => {
    res.status(200).json(mockData);
});

app.listen(config.UGC_PORT, () => {
    console.log(`User Generated Content Service is running at port: ${config.UGC_PORT}`);
});


app.use(sharedMiddlewares.catchServerError);