const mongoose = require('mongoose');

async function getDataBase(){

    try{
        await  mongoose.connect('mongodb://localhost:27017/test')
       console.log('connection made successfully')
    }catch(err){
          console.log(err)
    }


}

module.exports = {getDataBase};