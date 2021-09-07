const config = {
    INTERNAL_API_KEY : process.env.INTERNAL_API_KEY,
    EXTERNAL_API_KEY: process.env.EXTERNAL_API_KEY,
    PDP_PORT: 5001,
    PRODUCT_PORT: 5002,
    METADATA_PORT: 5003,
    UGC_PORT: 5004,
    BASE_URL: 'http://localhost:'
};

if (process.env.NODE_ENV === "dev") {
    config.INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || 'int-ecom-001';
    config.EXTERNAL_API_KEY = process.env.EXTERNAL_API_KEY || 'ext-ecom-002';
}

module.exports = config;