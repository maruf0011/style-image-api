const devConfig = require('./development');
const prodConfig = require('./production');

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
