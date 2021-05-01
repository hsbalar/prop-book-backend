export default {
  // mongodb configuration
  database: {
    url:
      'mongodb+srv://proBookDb:eH.7EdgeXj7KkB.@cluster0.3hotk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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
