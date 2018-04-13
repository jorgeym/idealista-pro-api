const mongoose = require('mongoose');
const houseSchema = new mongoose.Schema({
    houseType: {
        type: String,
        required: [true, 'The type is required']
    },
    price: {
        type: String,
        required: [true, 'The price is required']
    },
    image: {
        type: String,
        default: ''
    }

}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
 });


 const House = mongoose.model('House', houseSchema);
 module.exports = House;
