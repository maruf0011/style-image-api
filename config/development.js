module.exports = {
  server: {
    host: 'localhost',
    port: 5000,
    routes: {
      cors: true,
    },
  },
  database: {
    client: 'mysql',
    debug: 'true',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'doctApp',
      charset: 'utf8',
    },
  },
};
