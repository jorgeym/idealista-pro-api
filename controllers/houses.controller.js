const mongoose = require('mongoose');
const House = require('../models/house.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  House.find()
    .then(houses => res.json(houses))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  House.findById(id)
    .then(house => {
      if (house) {
        res.json(house)
      } else {
        next(new ApiError(`House not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.search = (req, res, next) => {
  const {
    houseType,
    priceMin,
    priceMax,
  } = req.body;
  console.log(req.body)
  House.find({"houseType": houseType, "price": { $gte: priceMin, $lte: priceMax } })
    .then((houseSearchResults) => {
      console.log(houseSearchResults)
      res.json(houseSearchResults);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}

module.exports.create = (req, res, next) => {
  const house = new House(req.body);
  if (req.file) {
    house.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }
  house.save()
    .then(() => {
      res.status(201).json(house);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  House.findByIdAndRemove(id)
    .then(house => {
      if (house) {
        res.status(204).json()
      } else {
        next(new ApiError(`House not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  console.log(req.body, 'asdasdasda', req.file, 'asdasdasdasd', req.params.id)
  const id = req.params.id;
  if (req.file) {
    req.body.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  House.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(house => {
      if (house) {
        res.json(house)
      } else {
        next(new ApiError(`House not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}
