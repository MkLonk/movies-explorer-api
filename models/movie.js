const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String, // это строка
    required: true, // обязательное поле
    minlength: 2, // минимум 2 символа
    maxlength: 30, // максимум 30 символов
  },

  director: { // режиссёр фильма
    type: String, // это строка
    required: true, // обязательное поле
    minlength: 2, // минимум 2 символа
    maxlength: 30, // максимум 30 символов
  },

  duration: { // длительность фильма
    type: Number, // это число
    required: true, // обязательное поле
  },

  year: { // год выпуска фильма
    type: String, // это строка
    required: true, // обязательное поле
    minlength: 2, // минимум 2 символа
    maxlength: 30, // максимум 30 символов
  },

  description: { // описание фильма
    type: String, // это строка
    required: true, // обязательное поле
    minlength: 2, // минимум 2 символа
    maxlength: 256, // максимум 256 символов
  },

  image: { // ссылка на постер к фильму
    type: String, // это строка
    required: true, // обязательное поле
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },

  trailer: { // ссылка на трейлер фильма
    type: String, // это строка
    required: true, // обязательное поле
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },

  thumbnail: { // миниатюрное изображение постера к фильму
    type: String, // это строка
    required: true, // обязательное поле
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },

  owner: { // _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true, // обязательное поле
  },

  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: String,
    required: true, // обязательное поле
  },

  nameRU: { // название фильма на русском языке
    type: String, // это строка
    required: true, // обязательное поле
    minlength: 2, // минимум 2 символа
    maxlength: 30, // максимум 30 символов
  },

  nameEN: { // название фильма на английском языке
    type: String, // это строка
    required: true, // обязательное поле
    minlength: 2, // минимум 2 символа
    maxlength: 30, // максимум 30 символов
  },
});

module.exports = mongoose.model('movie', movieSchema);
