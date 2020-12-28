const mongoose = require('mongoose')

const Location = mongoose.model(
    'Location',
    new mongoose.Schema({
        city: String,
        state: String,
        country: String,
        county: String,
        zipcode: String
    })
)

module.exports = Location