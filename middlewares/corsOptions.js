const whitelist = [
  'http://diploma.mihailov.nomoredomains.club',
  'https://diploma.mihailov.nomoredomains.club',
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
