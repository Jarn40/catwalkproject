const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dev:DEV2019@mockup-chsci.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectId = require('mongodb').ObjectID

client.connect()
    .then(conn => global.conn = conn.db("catwalk"))
    .catch(err => console.log(err))

function findAll(callback) {
    global.conn.collection("supermercados").find({}).toArray(callback);
}

function findOne(id, callback) {
    global.conn.collection("supermercados").find(new ObjectId(id)).toArray(callback);
}

function insertOne(supermercado, callback) {
    global.conn.collection("supermercados").insertOne(supermercado, callback);
}

function updateOne(id, supermercado, callback) {
    global.conn.collection("supermercados").updateOne({ _id: new ObjectId(id) }, { $set: supermercado }, callback
    );
}

function deleteOne(id, callback) {
    global.conn.collection("supermercados").deleteOne({ _id: new ObjectId(id) }, callback);
}


client.close()

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }
