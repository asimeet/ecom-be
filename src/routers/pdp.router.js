const express = require("express");
const router = express.Router();
const { callMicroservice } = require('../lib/common');
const lodash = require('lodash');

router.get('/', (req, res) => {
    res.status(200).send("Welcome to Product Description Page service");
});

/**
 * @swagger
 * definitions:
 *  info:
 *      type: object
 *      properties:
 *          title: 
 *              type: string
 *          header:
 *              type: string
 *          description: 
 *              type: string
 *          recyleInfo: 
 *              type: string
 *  metadata:
 *      type: object
 *      properties:
 *          title:
 *              type: string
 *          ogTitle:
 *              type: string
 *          description:
 *              type: string
 *          ogDescription:
 *              type: string
 *          ogUrl:
 *              type: string
 *          ogImage:
 *              type: string
 *          keywords:
 *              type: string
 *  items:
 *      type: array
 *      items: 
 *          type: object
 *          properties:
 *              itemId: 
 *                  type: string
 *              color: 
 *                  type: string
 *              size:
 *                  type: string
 *              stock:
 *                  type: integer
 *              price: 
 *                  type: integer
 *              currency: 
 *                  type: integer
 *      description: Describes price and stock for item of unique color+size combination of a product
 *  ratings:
 *      type: array
 *      items: 
 *          type: object
 *          properties:
 *              userEmail:
 *                  type: string
 *              stars:
 *                  type: integer
 *              comment:
 *                  type: string
 *      description: Contains ratings with attributes stars, userEmail and comment
 *  productImageUrls:
 *      type: array
 *      items:
 *          type: object
 *          properties:
 *              original:
 *                  type: string
 *                  description: original picture url from cdn
 *              thumbnail:
 *                  type: string
 *                  description: thumbnail picture url from cdn
 */

/**
 * @swagger
 * paths:
 *  /api/get-product-description/{id}:
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
 *                              $ref: '#/definitions/info' 
 */
router.get('/get-product-description/:id', async (req, res, next) => {
    try {
        const info = await callMicroservice('PRODUCT', 'GET', `info/${req.params.id}`);
        res.status(200).json({info});
    } catch (err) {
        err = typeof err == 'string' ? Error(err) : err; 
        next(err);
    }
});

/**
 * @swagger
 * paths:
 *  /api/get-product-metadata/{id}:
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
 *                          metadata: 
 *                              $ref: '#/definitions/metadata'  
 */
 router.get('/get-product-metadata/:id', async (req, res, next) => {
    try {
        let metadata = await callMicroservice('METADATA', 'GET', `product-info/${req.params.id}`);
        res.status(200).json({metadata});
    } catch (err) {
        err = typeof err == 'string' ? Error(err) : err; 
        next(err);
    }
});

/**
 * @swagger
 * /api/get-product-specs/{id}:
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
 *                          $ref: '#/definitions/ratings'
 *                      info:
 *                          $ref: '#/definitions/info'
 *                      items:
 *                          $ref: '#/definitions/items'
 */
router.get('/get-product-specs/:id', async (req, res, next) => {
    try {
        let info, items, ratings, serviceCalls;
        serviceCalls = [
            callMicroservice('PRODUCT', 'GET', `info/${req.params.id}`),
            callMicroservice('PRODUCT', 'GET', `specs/${req.params.id}`),
            callMicroservice('PRODUCT', 'GET', `ratings/${req.params.id}`),
        ];
        [info, items, ratings] = await Promise.all(serviceCalls);
        const response = { ratings, info, items};
        res.status(200).json(response);
    } catch (err) {
        err = typeof err == 'string' ? Error(err) : err; 
        next(err);
    }
});

/**
 * @swagger
 * /api/get-product-image-urls/{id}:
 *  get:
 *      summary: Get Product Image URL from CDN for Slider View
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
 *                      productImageUrls:
 *                          $ref: '#/definitions/productImageUrls'
 */
router.get('/get-product-image-urls/:id', async (req, res, next) => {
    try {
        const productImageUrls = await callMicroservice('UGC', 'GET', `product-images/${req.params.id}`);
        res.status(200).json({productImageUrls});
    } catch (err) {
        err = typeof err == 'string' ? Error(err) : err; 
        next(err);
    }
});

module.exports = router;