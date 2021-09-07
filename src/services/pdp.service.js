const express = require('express');
const config = require('../../config');
const sharedMiddlewares = require('../lib/shared-middlewares');
const app = express();
const router = require('../routers/pdp.router');

/** swagger setup */
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

/** use middle wares */
app.use(express.json());
app.use(sharedMiddlewares.enableExternalApiKey);
app.use(sharedMiddlewares.makeSecured);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/** Mange routes */

app.use(router);

app.listen(config.PDP_PORT, () => {
    console.log(`Product Description Page service is running at port: ${config.PDP_PORT}`);
});

app.use(sharedMiddlewares.catchServerError);