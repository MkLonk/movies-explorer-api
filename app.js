// Импрорты
require('dotenv').config();

const helmet = require('helmet');
const express = require('express');
const { celebrate, errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');

const myErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./middlewares/corsOptions');
const { validSetCreateUser } = require('./middlewares/validSets');
const limiter = require('./middlewares/rateLimit');
const auth = require('./middlewares/auth');

const routes = require('./routes');
const { login, createUser } = require('./controllers/users');

// константы .env
const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

// создаем app на экспрессе
const app = express();

// подключаемся к серверу mongo
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// подключаем логгер запросов
app.use(requestLogger);
app.use(errorLogger); // подключаем логгер ошибок

// CORS настройка | для пропуска всех сайтов - app.use(cors())
app.use(cors(corsOptions));

// защитные мидлвары
app.use(helmet());
app.use(limiter);

// парсер для собирания JSON-формата
app.use(express.json());

// открытые роуты
app.post('/signin', celebrate(validSetCreateUser), login); // роут для логина
app.post('/signup', celebrate(validSetCreateUser), createUser); // роут для регистрации

// авторизация
app.use(auth);

// роуты закрытые авторизацией
app.use(routes);

// обработка ошибок celebrate
app.use(errors());

// обработка ошибок централизованным обработчиком
app.use(myErrors);

// слушаем порт
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
