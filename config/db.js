const mongoose = require('mongoose');

require('dotenv').config({ path: '.env'});

const connectionDB = async () => {

    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
       });
       console.log('Se ha conectado correctamente..');
    }catch(error){
       console.log(error);
       process.exit(1);
    }
}

module.exports = connectionDB;