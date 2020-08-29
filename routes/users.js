const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');


router.post('/',
  [
    check('name', 'el nombre es obligatorio').notEmpty(),
    check('email', 'Correo inválido').isEmail(),
    check('password', 'La contraseña debe contener mínimo 3 caracteres').isLength(3)

  ],
  usersController.createUser);

module.exports = router;