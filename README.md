<p align="center">
  <h3 align="center">The Ecommerce App - Backend</h3>

  <p align="center">
     This is a backend with express microservices that can be independently deployed and scaled.
    <br />
    <br />
    <a href="">View Demo</a>
    ·
    <a href="https://gitlab.com/asimeetp/ecom-be/-/issues">Report Bug</a>
    ·
    <a href="https://gitlab.com/asimeetp/ecom-be/-/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#development-environment">Development Environment</a></li>
        <li><a href="#production-environment">Production Environment</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a backend implemented with node.js and express to build microservices.

Since this is a backend of a demo application. Database is not used instead data is rendered through mock data sets hard coded in the repository.

The implemention demostrates the following features:

* 4 microservices that use different instances of express and hence can be deployed and scaled independently. Also they all listen to different ports of the server. They are namely:
    * ```pdp.service.js``` - Product Description Page Microservice
    * ```product.service.js``` - Product Microservice
    * ```ugc.service.js``` - User Generated Content MicroService
    * ```metadata.service.js``` - Metadata Microservice
    *

* These microservices are implemented in <b>Agrregator Pattern</b> and the Product Description Page Microservice behaves as the aggregator.

* Ideally only the Product Description Page Microservice is exposed to the outside but requires an EXTERNAL_API_KEY(set with environment variables)

* The other microservices are protected with an INTERNAL_API_KEY(set with environment variables) and can be accessed from the Product Description Page Microservice.

* The microservices are scaled differently and deployed separately with the help of PM2 and 
```pm2.config.js ``` has the configurations for the same.

* PIPELINE: The deployment is administered through <b>Gitlab Runner</b> pipeline and the configurations are maintained in ```.gitlab-ci-stopped.yml```. The postfix ```-stopped``` should be removed to activate the pipeline.The deployment has 3 stages ```test``` , ```build```, ```deploy```.

* The API documentation and testing is implemented with <b>Swagger</b> and runs at path ```/api-docs```. The API docummnetation is present only for Product Description Page Microservice as it is the only exposed microservices out of all.




### Built With

The following npm libraries have been used in the application:

* [express](https://www.npmjs.com/package/express)
  - Used for rest api and microservice implementation
* [pm2](https://www.npmjs.com/package/pm2)
  - Used for microservice deployment and instance management
* [axios](https://www.npmjs.com/package/axios)
  - Used for making http requests to product-description-page microservice.
* [lodash](https://www.npmjs.com/package/lodash)
  - Used for common js funtions like sorting, getting uniqe values and getting start-case text.
* [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
  - Used for API documentation
* [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
  - Used for inline swagger component's yml in form of comments


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://gitlab.com/asimeetp/ecom-be.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install PM2 globally
   ```sh
   npm install pm2  -g
   ```


<!-- USAGE EXAMPLES -->
## Usage

### Development Environment
1. On the ecom-be folder level use the following command to start backend
   ```sh
        npm run start-all-dev
   ```
   or
   ```sh
        pm2 start pm2.config.js
    ```

3. Application is ready to use in localhost ideally on port 5001

4. Check API documentation and try it out in:
    ```sh
        http://localhost:5001/api-docs
    ```


### Production Environment
1. On the ecom-be folder level use the following command to start backend
  ```sh
    INTERNAL_API_KEY={secret internal api key} EXTERNAL_API_KEY={public api key for pdp microservice}  pm2 start pm2.config.js --env=production --update-env
  ```
2. Application will be ready for use in production server

<!-- CONTACT -->
## Contact

[Asimeet Padhee](https://github.com/asimeet)

Email: [asimeet.ap@gmail.com](mailto:asimeet.ap@gmail.com)
