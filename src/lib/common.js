const config = require('../../config');
const axios = require('axios');

const callMicroservice = async(microserviceName, requestMethod, path, reqBody = null) => {
    if(requestMethod == 'POST' && !reqBody){
        throw Error('POST request needs a body');
    }
    const isDev = process.env.NODE_ENV == 'dev';
    const microserviceBaseUrls = {
        'PRODUCT': isDev? `http://localhost:${config.PRODUCT_PORT}` : config.PRODUCT_URL,
        'UGC': isDev? `http://localhost:${config.UGC_PORT}` : config.UGC_URL,
        'METADATA': isDev? `http://localhost:${config.METADATA_PORT}` : config.METADATA_PORT
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

module.exports = {
    callMicroservice
}