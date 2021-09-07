const express = require('express');
const config = require('../../config');
const sharedMiddlewares = require('../lib/shared-middlewares');
const app = express();
const router = require('../routers/pdp.router');

/**
 * Enabling CORS for handling cross-origin request
 * -----------------------------------------------
 */
 app.use(function (req, res, next) {
  const origin = process.env.NODE_ENV === 'development' ? '*' : process.env.PDP_FRONTEND_URL;
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/**
 * -------------end-of-cors-enablement------------
 */

/**
 *  Swagger Initialization for API Documention
 * ----------------------------------------------------
 */
const swaggerJsonDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Product Description Page Microservice",
      description: "This is technical and testable documention for Product Description Page Microservice APIs ",
      contact: {
          name: 'Asimeet Padhee',
          email: 'asimeet.ap@gmail.com'
      }
    }
  },
  apis: ['src/routers/pdp.router.js'] //['./routes/api/fruits.js']
}

const swaggerDocs = swaggerJsonDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 *  ----------end-of-swagger-init---------------------
 */

/** use middle wares */
app.use(express.json());
app.use(sharedMiddlewares.enableExternalApiKey);
app.use(sharedMiddlewares.makeSecured);


/** Mange routes */

app.use('/api',router);

app.listen(config.PDP_PORT, () => {
    console.log(`Product Description Page service is running at port: ${config.PDP_PORT}`);
});

app.use(sharedMiddlewares.catchServerError);