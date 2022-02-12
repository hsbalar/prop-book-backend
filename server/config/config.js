export default {
  // mongodb configuration
  database: {
    url: process.env.DB_HOST,
    options: {
      user: '',
      pass: '',
    },
  },

  // session configuration
  session: {
    name: 'sessionid',
    secret: 'pro-book secret app',
    cookie: {
      path: '/',
      secure: false,
      maxAge: 3600000,
    },
  },

  // http logging
  logging: {
    enable: false,
    format: 'combined',
  },

  // server config
  server: {
    host: 'localhost',
    port: 3000,
  },
};
