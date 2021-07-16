const { Joi } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

const metIsURL = (value) => {
  if (validator.isURL(value)) {
    return value;
  }
  throw new Error('URL validation err');
};

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
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

const validSetPatchAvatar = {
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
    avatar: Joi.string().required().custom(metIsURL),
  }),
};

const validSetGetUsers = {
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

const validSetGetUserId = {
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

const validSetGetCards = {
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

const validSetGetCardId = {
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

const validSetCreateCard = {
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
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(metIsURL),
  }),
};

module.exports = {
  validSetCreateUser,
  validSetPatchUser,
  validSetPatchAvatar,
  validSetGetUsers,
  validSetGetUserId,
  validSetGetCards,
  validSetGetCardId,
  validSetCreateCard,
};
