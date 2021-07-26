const router = require('express').Router();
const { celebrate } = require('celebrate');

const { validSetPatchUser, validSetGetUser } = require('../middlewares/validSets');

const { patchMe, getMe } = require('../controllers/users');

router.get('/me', celebrate(validSetGetUser), getMe); // — найти пользователя
router.patch('/me', celebrate(validSetPatchUser), patchMe); // — обновить пользователя

module.exports = router;
