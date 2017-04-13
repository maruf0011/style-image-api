const Routes = require('./routes');

exports.register = (server, option, next) => {
  server.route(Routes);
  next();
};

exports.register.attributes = {
  name: 'Style',
  version: '1.0.0',
};
