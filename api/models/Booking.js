const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookingSchema = new Schema({
    // Il booking fa riferimento al bnb prenotato e all'id dell'user che effettua la prenotazione
    bnb: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Bnb'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    name: {type:String, required:true},
    phoneNumber: {type:String, required:true},
    price: Number
});

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;

