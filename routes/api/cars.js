const express = require('express')

const CarCtrl = require('../../controllers/carCtrl');

const router = express.Router()

router.post('/car', CarCtrl.createCar)
router.put('/car/:id', CarCtrl.updateCar)
router.delete('/car/:id', CarCtrl.deleteCar)
router.get('/car/:id', CarCtrl.getCarById)
router.get('/cars', CarCtrl.getCars)

module.exports = router