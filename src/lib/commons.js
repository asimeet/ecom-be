const config = require('../../config');
const axios = require('axios');

const callMicroservice = async(microserviceName, requestMethod, path, reqBody = null) => {
    if(requestMethod == 'POST' && !reqBody){
        throw Error('POST request needs a body');
    }
    const microserviceBaseUrls = {
        'PRODUCT': `http://localhost:${config.PRODUCT_PORT}`,
        'UGC': `http://localhost:${config.UGC_PORT}`,
        'METADATA': `http://localhost:${config.METADATA_PORT}`
    };
    const baseUrl = microserviceBaseUrls[microserviceName];
    if(!baseUrl){
        throw Error('Microservice Name is not valid')
    }
    const mainUrl = `${baseUrl}/${path}?API_KEY=${config.INTERNAL_API_KEY}`;

    if(requestMethod == 'GET') {
        return await new Promise( (resolve, reject) => {
            axios
            .get(mainUrl)
            .then(res => {
                if(res.status >= 200 && res.status <400){
                    resolve(res.data);
                }
                reject(Error(`HTTP status code: ${res.status}`));
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    if(requestMethod == 'POST') {
        return await new Promise( (resolve, reject) => {
            axios
            .post(mainUrl, reqBody)
            .then(res => {
                if(res.status >= 200 && res.status <400){
                    resolve(res.data);
                }
                reject(Error(`HTTP status code: ${res.status}`));
            })
            .catch(error => {
                reject(error);
            });
        });
    }

}

const enableExternalApiKey = (req, res, next) => {
    req.externalApiKeyEnabled = true;
    next();
}

const makeSecured =  (req, res, next) => {
    try {
        const API_KEY = req.query.API_KEY;

        if((req.externalApiKeyEnabled && API_KEY === config.EXTERNAL_API_KEY) || 
            API_KEY === config.INTERNAL_API_KEY) {
            next();
            return;
        }

        res.status(401).send("<h3>Unauthorized to use api</h3>");

    } catch(err) {
        throw err;
    }
}

const catchServerError = (err, req, res, next) => {
    if(err) {
        let errorHtml = `
        <h2> Error in Application.</h2>
        <h3> Kindly contact support@ecom.com for further assistance.</h3>
        <h3> Error: ${err.message}</h3>
        `;
        if(process.env.NODE_ENV !== "production") {
            errorHtml += `<p> Stack: ${err.stack} </p>`;
        }
        res.status(500).send(errorHtml);
    }
}

module.exports = {
    callMicroservice,
    middlewares: {
        enableExternalApiKey,
        makeSecured,
        catchServerError
    }
}