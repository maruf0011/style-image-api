const Hapi = require('hapi');

const routePlugins = require('./hapi-plugins');
const hapiPlugins = require('./swaggerGenerator');
const config = require('./../config');

const server = new Hapi.Server({
  connections: {
    routes: {
      cors: true,
    },
  },
});

server.connection(config.server);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  server.register(hapiPlugins, (err) => {
    if (err) {
      console.log('Plugin load error');
      throw err;
    } else {
      console.log('plugin loaded');
    }
  });
}


server.register(routePlugins, (err) => {
  if (err) {
    console.log('Routes load error');
    throw err;
  } else {
    console.log('Routes loaded');
  }
});

server.start((err) => {
  if (err) {
    console.log('server start error');
    throw err;
  } else {
    console.log('server started at ', server.info.uri);
  }
});
