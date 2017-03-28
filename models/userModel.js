const assert = require('assert');

exports.register = (user, db, callback) => {
  const collection = db.collection('documents');

  collection.insertOne(user, (err, result) => {
    assert.equal(null, err);
    console.log("Inserted 1 documents into the document collection");
    callback(result);
  });
};
