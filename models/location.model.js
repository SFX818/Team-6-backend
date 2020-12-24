const mongoose = require('mongoose')

const Location = mongoose.model(
    'Location',
    new mongoose.Schema({
        city: String,
        state: String,
        country: String
    })
)

module.exports = Location