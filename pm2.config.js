module.exports = {
  apps: [
    {
      name: "PDP_MS",
      script: "./src/services/pdp.service.js",
      watch: true,
      instances: 2,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "PRODUCT_MS",
      script: "./src/services/product.service.js",
      watch: true,
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "UGC_MS",
      script: "./src/services/ugc.service.js",
      watch: true,
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "METADATA_MS",
      script: "./src/services/metadata.service.js",
      watch: true,
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
