const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // token header
    const token = req.header('x-auth-token');
    let response = {};

    if(!token){
        response.status = 2;
        response.message = "No hay token, permiso no válido";
        return res.status(401).json(response);
    }

    try {

        const hash = jwt.verify(token, process.env.SECRETE_HASH);
        req.user = hash.user;
        next();

    } catch (error) {
        response.status = 3;
        response.message = "Token inválido";
       return res.status(401).json(response);
    }
}