const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

async function getDataBase(){
 
    let connectDB = await MongoClient.connect('mongodb://localhost:27017');
     let db =  connectDB.db('test');

     return db.collection('employees');


}

module.exports = {getDataBase,ObjectID};