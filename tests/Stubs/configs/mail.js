export default {
  default: 'smtp',

  mailers: {
    smtp: {
      driver: 'smtp',
      host: 'localhost',
      port: 5025,
      tls: {
        rejectUnauthorized: false,
      },
    },
  },
}
