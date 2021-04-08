const mongoose = require('mongoose')
const keys = require('../../config/keys');
mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db