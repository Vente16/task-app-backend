const express = require('express');
const connectionDB = require('./config/db');
const { response } = require('express');

connectionDB();

const app = express();

app.use(express.json({ extended: true }));

const PORT = process.env.PORT ||  4000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization, x-auth-token"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, DELETE, OPTIONS"
    );
    next();
  });

app.use('/api/users/', require('./routes/users'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/tasks/', require('./routes/task'));

app.get('/', (req, resp) => {
    resp.send('Holaa Amor!');
});

app.listen(PORT, () => {
    console.log(`El servidor está funcionado en el puerto ${PORT}`);
});

