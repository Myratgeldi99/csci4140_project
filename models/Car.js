const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Car = new Schema(
    {
        driverName: { type: String, required: true },
        driverId: { type: String, required: true, unique: true },
        vehicleModel: { type: String, required: true },
        plateNumber: { type: String, required: true, unique: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('cars', Car)