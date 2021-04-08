const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Car = new Schema(
    {
        driverName: { type: String, required: true },
        driverId: { type: Number, required: true },
        driverPhoneNumber: { type: String, required: true },
        vehicleModel: { type: String, required: true },
        plateNumber: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },

    },
    { timestamps: true },
)

module.exports = mongoose.model('cars', Car)