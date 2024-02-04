const mongoose = require('mongoose');
const {Schema} = mongoose;

const BnbSchema = new Schema({
    // In questo modo riferisco alla collezione User tramite l'id
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price: Number
});

const BnbModel = mongoose.model('Bnb', BnbSchema);

module.exports = BnbModel;