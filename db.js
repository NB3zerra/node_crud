var ObjectId = require('mongodb').ObjectID
var mongoClient = require('mongodb').MongoClient
mongoClient
  .connect('mongodb://localhost/workshoptdc')
  .then(conn => (global.conn = conn.db('workshoptdc')))
  .catch(err => console.log(err))

function findAll (callback) {
  global.conn
    .collection('customers')
    .find({})
    .toArray(callback)
}
//insert
function insert (customer, callback) {
  global.conn.collection('customers').insert(customer, callback)
}

//buscar apenas um

function findOne (id, callback) {
  global.conn
    .collection('customers')
    .find(new ObjectId(id))
    .toArray(callback)
}

//update you should add $set operator, which is an atomic operator like $inc, $push etc., to make it an update query. Like this;
function update (id, customer, callback) {
  global.conn
    .collection('customers')
    .updateOne({ _id: new ObjectId(id) }, { $set: customer }, callback)
}

//delete
function deleteOne (id, callback) {
  global.conn
    .collection('customers')
    .deleteOne({ _id: new ObjectId(id) }, callback)
}

module.exports = { findAll, insert, findOne, update, deleteOne }
