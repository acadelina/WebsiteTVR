module.exports = {
  email: {
    config: {
      provider: '@strapi/provider-email-nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'adelinaacsinte@gmail.com', // înlocuiește cu adresa ta Gmail
          pass: 'jvolgsklhzkxmyvu',     // înlocuiește cu parola de App Password
        },
      },
      settings: {
        defaultFrom: 'adelinaacsinte@gmail.com',
        defaultReplyTo: 'adelinaacsinte@gmail.com',
      },
    },
  },
};
