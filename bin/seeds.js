const mongoose = require('mongoose');
require('../configs/db.config');
const House = require('../models/house.model');

const houses = [
  {
    "type": "piso",
    "price": "1000"
  }
];

House.create(houses)
  .then(() => {
    console.info("Seeds success:", houses);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Seeds error:", houses);
    mongoose.connection.close();
  });
