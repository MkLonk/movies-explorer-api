const { Joi } = require('celebrate');
const validator = require('validator');

const metIsURL = (value) => {
  if (validator.isURL(value)) {
    return value;
  }
  throw new Error('URL validation err');
};

const metIsEmail = (value) => {
  if (validator.isEmail(value)) {
    return value;
  }
  throw new Error('email validation err');
};

// сет валидации запросов CreateUser
const validSetCreateUser = {
  // валидируем params
  params: Joi.object().keys({}),
  // валидируем headers
  headers: Joi.object().keys({}).unknown(),
  // валидируем query
  query: Joi.object().keys({}),
  // валидируем body
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9@+-]{3,30}$')),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(metIsURL),
  }),
};

// сет валидации запросов PatchUser
const validSetPatchUser = {
  // валидируем params
  params: Joi.object().keys({}),
  // валидируем headers
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(179).max(179),
  }).unknown(),
  // валидируем query
  query: Joi.object().keys({}),
  // валидируем body
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).custom(metIsEmail),
  }),
};

// сет валидации запросов GetUsers
const validSetGetUser = {
  // валидируем params
  params: Joi.object().keys({}),
  // валидируем headers
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(179).max(179),
  }).unknown(),
  // валидируем query
  query: Joi.object().keys({}),
  // валидируем body
  body: Joi.object().keys({}),
};

// сет валидации запросов GetMovies
const validSetGetMovies = {
  // валидируем params
  params: Joi.object().keys({}),
  // валидируем headers
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(179).max(179),
  }).unknown(),
  // валидируем query
  query: Joi.object().keys({}),
  // валидируем body
  body: Joi.object().keys({}),
};

// сет валидации запросов CreateMovies
const validSetCreateMovies = {
  // валидируем params
  params: Joi.object().keys({}),
  // валидируем headers
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(179).max(179),
  }).unknown(),
  // валидируем query
  query: Joi.object().keys({}),
  // валидируем body
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(12),
    description: Joi.string().required().min(2).max(255),
    image: Joi.string().required().custom(metIsURL),
    trailer: Joi.string().required().custom(metIsURL),
    thumbnail: Joi.string().required().custom(metIsURL),
    movieId: Joi.string().required().min(2).max(30), // Joi.string().length(24).hex(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
};

// сет валидации запросов GetMovies
const validSetDelMovies = {
  // валидируем params
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
  // валидируем headers
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(179).max(179),
  }).unknown(),
  // валидируем query
  query: Joi.object().keys({}),
  // валидируем body
  body: Joi.object().keys({}),
};

module.exports = {
  validSetCreateUser,
  validSetPatchUser,
  validSetGetUser,
  validSetGetMovies,
  validSetCreateMovies,
  validSetDelMovies,
};
