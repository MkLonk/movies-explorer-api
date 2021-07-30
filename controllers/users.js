const { NODE_ENV, JWT_SECRET, SALT_ROUNDS = 10 } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundErr = require('../errors/notFound');
const BadRequestErr = require('../errors/badRequest');
const ConflictErr = require('../errors/conflict');
const UnauthorizedErr = require('../errors/unauthorized');

// возвращает аворизованного пользователя
function getMe(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch(next);
}

// обновляет name и email пользователя
function patchMe(req, res, next) {
  User.findById(req.user._id)
    .then((savedUser) => {
      if (!savedUser) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      const { name = savedUser.name, email = savedUser.email } = req.body;

      User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
        .then((updatedUser) => {
          if (updatedUser) {
            return res.status(201).send(updatedUser);
          }
          throw new NotFoundErr('Нет пользователя с таким id');
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestErr('Переданы некорректные данные при обновлении пользователя.');
          }
          return next(err);
        })
        .catch(next);
    })
    .catch(next);
}

// создаёт пользователя
function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, Number(SALT_ROUNDS)) // хешируем пароль
    .then((hashPass) => User.create({
      name, email, password: hashPass,
    }))
    .then(() => res.status(201).send({
      data: {
        name, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr('Переданы некорректные данные при создании пользователя.');
      } else if (err.name === 'MongoError') {
        throw new ConflictErr('Конфликт в базе данных, скорее всего данный email уже используется.');
      } else {
        return next(err);
      }
    })
    .catch(next);
}

// контроллер login для аутентификации пользователя
function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.status(201).send({ token });
    })
    .catch(() => {
      // ошибка аутентификации UnauthorizedErr
      throw new UnauthorizedErr('Неправильная почта или пароль.');
    })
    .catch(next);
}

module.exports = {
  getMe,
  patchMe,
  createUser,
  login,
};
