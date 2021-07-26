const Movie = require('../models/movie');
const NotFoundErr = require('../errors/notFound');
const BadRequestErr = require('../errors/badRequest');
const ConflictErr = require('../errors/conflict');
const ForbiddenErr = require('../errors/forbidden');

// найти все фильмы авторизованного пользователя
function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => {
      if (!movies) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      return res.status(200).send(movies);
    })
    .catch(next);
}

// добавить фильм
function createMovies(req, res, next) {
  req.body.owner = req.user._id; // записываю id авторизованного пользователя в body.owner

  Movie.findOne({ movieId: req.body.movieId, owner: req.user._id })
    .then((findMovie) => {
      if (findMovie) { // если фильм нашелся, выбрасить ошибку
        throw new ConflictErr('Конфликт в базе данных, данный фильм уже добавлен в Избранные.');
      } else { // иначе, добавить фильм в избранные
        Movie.create(req.body)
          .then((addMovie) => {
            res.status(201).send({ data: addMovie });
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new BadRequestErr('Переданы некорректные данные.');
            } else {
              return next(err);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
}

// удалить фильм
function deleteMovies(req, res, next) {
  Movie.findById(req.params.id)
    .then((findMovie) => {
      if (!findMovie) { // фильм не найдена
        throw new NotFoundErr('Фильм с таким id не найден');
      }

      // проверить права авторизованного пользователя на уделение
      if (String(findMovie.owner._id) === String(req.user._id)) {
        Movie.findByIdAndRemove(req.params.id)
          .then((delMovie) => res.status(200).send(delMovie))
          .catch(next);
      } else {
        throw new ForbiddenErr('У клиента нет права на удаление записи');
      }
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
