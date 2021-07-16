const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: { // имя пользователя
    type: String, // это строка
    required: true,
    minlength: 2, // минимум 2 символа
    maxlength: 30, // максимум 30 символов
  },

  email: { // email пользователя
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },

  password: { // password пользователя
    type: String,
    required: true,
    minlength: 2,
    select: false, // так по умолчанию хеш пароля не будет возвращаться из базы
  },

});

// Дополняем объект userSchema методом findUserByCredentials.
// Метод findUserByCredentials находит пользователя в БД по email,
// и сравнивает полученный пароль с сохраненным
// Функция findUserByCredentials не должна быть стрелочной!!!
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { // не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
