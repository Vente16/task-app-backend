const User = require('../models/User');
const bcriptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, rep) => {

   // satatus  1 = succes, 2 = user not exists, 3 = erros, 4 = server error
   let response = {};

   const errors = validationResult(req);
   //console.log(errors);
   if(!errors.isEmpty()){
        response.status =  3;
        response.errors = errors.array();
        return rep.status(400).json(response);
   }

   const { email, password } = req.body;
   try{

      let user = await User.findOne({email});

      if(!user){
        response.status = 2;
        response.message = "El usuario no existe";
        return rep.status(200).json(response);
        //return rep.status(404).json({msg: 'El usuario no existe'})
      }

      const validPassword = await bcriptjs.compare(password, user.password);

      if(!validPassword){
        response.status = 2;
        response.message = "Contraseña incorrecta";
        return rep.status(200).json(response);
      }

      const paylod = {
        user: {
            id: user._id,
            name: user.name
        }
      };

      jwt.sign(paylod, process.env.SECRETE_HASH,{
        expiresIn: 3600000,
       }, (error, token) => {
         if(error) throw error;
         response.status = 1;
         response.token = token;
         rep.status(200).json(response);
      });

   }catch(error){
     console.log(error);
     response.status = 4;
     response.message = "Ha ocurrido un error";
     rep.status(500).send(response);
   }
}

exports.userCheckToken = (req, rep) => {
    let response = {};
    response.status =  1;
    response.message = "Token válido";
    return rep.status(200).json(response);

}