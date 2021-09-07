const config =  require('../../config');

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
    enableExternalApiKey,
    makeSecured,
    catchServerError
}