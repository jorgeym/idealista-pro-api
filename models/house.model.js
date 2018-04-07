const mongoose = require('mongoose');
const houseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'The house type is required']
    },
    price: {
        type: String,
        required: [true, 'The house price is required']
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
