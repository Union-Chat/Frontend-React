const env = {
  API_ENDPOINT: WEBPACK.NODE_ENV === 'staging'
    ? WEBPACK.CFG.api.staging
    : WEBPACK.CFG.api.path
};

export default env;
