const Car = require('../models/Car')

createCar = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a car',
        })
    }

    const car = new Car(body)

    if (!car) {
        return res.status(400).json({ success: false, error: err })
    }

    car
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: car._id,
                message: 'Car is created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Car not created!',
            })
        })
}

updateCar = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Car.findOne({ _id: req.params.id }, (err, car) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Car not found!',
            })
        }
        car.driverName = body.driverName
        car.driverId = body.driverId
        car.driverPhoneNumber = body.driverPhoneNumber
        car.vehicleModel = body.vehicleModel
        car.plateNumber = body.plateNumber
        car.lat = body.lat
        car.lng = body.lng
        car
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: car._id,
                    message: 'Car updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Car not updated!',
                })
            })
    })
}

deleteCar = async (req, res) => {
    await Car.findOneAndDelete({ _id: req.params.id }, (err, car) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!car) {
            return res
                .status(404)
                .json({ success: false, error: `Car not found` })
        }

        return res.status(200).json({ success: true, data: car })
    }).catch(err => console.log(err))
}

getCarById = async (req, res) => {
    await Car.findOne({ _id: req.params.id }, (err, car) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!car) {
            return res
                .status(404)
                .json({ success: false, error: `Car not found` })
        }
        return res.status(200).json({ success: true, data: car })
    }).catch(err => console.log(err))
}

getCars = async (req, res) => {
    await Car.find({}, (err, cars) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!cars.length) {
            return res
                .status(404)
                .json({ success: false, error: `Car not found` })
        }
        return res.status(200).json({ success: true, data: cars })
    }).catch(err => console.log(err))
}

module.exports = {
    createCar,
    updateCar,
    deleteCar,
    getCars,
    getCarById,
}