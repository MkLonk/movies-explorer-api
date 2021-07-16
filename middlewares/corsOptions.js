const whitelist = [
  'http://mesto.lonk.nomoredomains.club',
  'https://mesto.lonk.nomoredomains.club',
  'http://localhost:3000',
  'https://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = { corsOptions };
