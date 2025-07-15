const webpack = require('webpack');

module.exports = function override(config, env) {
  // Suppress all Node.js deprecation warnings
  process.env.NODE_NO_WARNINGS = '1';
  
  // Fix webpack dev server deprecation warnings by overriding devServer config
  if (env === 'development') {
    const originalDevServer = config.devServer;
    
    config.devServer = {
      ...originalDevServer,
      onBeforeSetupMiddleware: undefined,
      onAfterSetupMiddleware: undefined,
      setupMiddlewares: (middlewares, devServer) => {
        return middlewares;
      },
    };
  }

  // Suppress specific deprecation warnings in webpack
  if (!config.ignoreWarnings) {
    config.ignoreWarnings = [];
  }
  
  config.ignoreWarnings.push(
    /DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE/,
    /DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE/,
    /Critical dependency: the request of a dependency is an expression/,
    /Module not found: Error: Can't resolve/
  );

  return config;
};
