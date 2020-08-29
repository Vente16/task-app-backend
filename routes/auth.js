const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middelwares/auth');


router.post('/',
  [
    check('email', 'Correo inválido').isEmail(),
    check('password', 'La contraseña debe contener mínimo 3 caracteres').isLength(3)
  ],
  authController.authUser);

router.get('/',
  auth,
  authController.userCheckToken
);

module.exports = router;