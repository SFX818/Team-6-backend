const mongoose = require('mongoose')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username:String,
        email:String,
        password:String,
        zipcode:String,
        county: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Role'
            }
        ],
        primaryLocation:'',
        favoriteLocations: [],
        searchLocations:[]
    })
)

module.exports = User