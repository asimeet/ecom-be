const express = require("express");
const router = express.Router();
const { callMicroservice } = require('../lib/common');
const lodash = require('lodash');

router.get('/', (req, res) => {
    res.status(200).send("Welcome to Product Description Page service");
});

/**
 * @swagger
 * paths:
 *  /get-product-description/{id}:
 *      get:
 *          summary: Gets Product description for a product id and metadata for ui
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: query
 *                name: API_KEY
 *                description: public API KEY for acccessing the api
 *                type: string
 *                required: true
 *                default: ext-ecom-002
 *              - in: path
 *                name: id
 *                description: Product ID
 *                type: string
 *                required: true
 *                default: 12345
 *          responses:
 *              200:
 *                  description: Object with info and metadata
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          info:
 *                              type: object
 *                              properties:
 *                                  title: 
 *                                      type: string
 *                                  header:
 *                                      type: string
 *                                  description: 
 *                                      type: string
 *                                  recyleInfo: 
 *                                      type: string  
 *                          metadata:
 *                               type: object
 *    
 */
router.get('/get-product-description/:id', async (req, res, next) => {
    try {
        let info, metaData, serviceCalls;
        serviceCalls = [
            callMicroservice('PRODUCT', 'GET', `info/${req.params.id}`),
            callMicroservice('METADATA', 'GET', `product-info/${req.params.id}`)
        ];
        [info,metaData] = await Promise.all(serviceCalls);
        res.status(200).json({info, metaData});
    } catch (err) {
        err = typeof err == 'string' ? Error(err) : err; 
        next(err);
    }
});

/**
 * @swagger
 * /get-product-specs/{id}:
 *  get:
 *      summary: Get product availibity, price, colors, ratings and specification related metadata
 *      parameters:
 *          - in: query
 *            name: API_KEY
 *            description: Api key for secured access
 *            type: string
 *            required: true
 *            default: ext-ecom-002
 *          - in: path
 *            name: id
 *            description: Product ID
 *            type: string
 *            required: true
 *            default: 12345
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Object having different specification details
 *              schema:
 *                  type: object
 *                  properties:
 *                      ratings:
 *                          type: array
 *                          items: 
 *                              type: object
 *                          description: Contains ratings with attributes star, userEmail and comment
 *                      items:
 *                          type: array
 *                          items: 
 *                              type: object
 *                          description: Describes price and stock for item of unique color+size combination of a product
 *                      info:
 *                          type: object
 *                          properties:
 *                              title: 
 *                                  type: string
 *                              header:
 *                                  type: string
 *                              description: 
 *                                  type: string
 *                              recyleInfo: 
 *                                  type: string 
 *                      metadata:
 *                          type: object
 */
router.get('/get-product-specs/:id', async (req, res, next) => {
    try {
        let info, specs, metaData, ratings, serviceCalls;
        serviceCalls = [
            callMicroservice('PRODUCT', 'GET', `info/${req.params.id}`),
            callMicroservice('PRODUCT', 'GET', `specs/${req.params.id}`),
            callMicroservice('METADATA', 'GET', `product-specs/${req.params.id}`),
            callMicroservice('PRODUCT', 'GET', `ratings/${req.params.id}`),
        ];
        [info, specs, metaData, ratings] = await Promise.all(serviceCalls);
        const colors = lodash.uniq(lodash.map(specs, (item) => lodash.startCase(item.color)));
        const basePrice = `€ ${specs[0].price}`;
        const sizes = lodash.uniq(lodash.map(specs, (item) => item.size ));
        const response = { info, specs, colors, sizes,  basePrice, metaData, ratings};
        res.status(200).json(response);
    } catch (err) {
        err = typeof err == 'string' ? Error(err) : err; 
        next(err);
    }
});

router.get('/get-product-images/:id', async (req, res, next) => {
    try {
        let imageUrls, metaData, serviceCalls;
        serviceCalls = [
            callMicroservice('UGC', 'GET', `product-images/${req.params.id}`),
            callMicroservice('METADATA', 'GET', `product-images/${req.params.id}`)
        ];
        [imageUrls, metaData] = await Promise.all(serviceCalls);
        const results = [... imageUrls];
        results.forEach( item => delete item.productId);
        res.status(200).json({imageUrls: results, metaData});
    } catch (err) {
        err = typeof err == 'string' ? Error(err) : err; 
        next(err);
    }
});

module.exports = router;