const mongo = require('mongodb');
const assert = require('assert');

const userModel = require('../models/userModel');

const url = 'mongodb://localhost:27017/mongotest';

exports.register = (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  mongo.connect(url, (err, db) => {
    assert(null, err);
    console.log("Connected correctly to server");
    userModel.register(user, db, () => {
      db.close();
    });
    res.json({
      message: 'success',
    });
  });
};
