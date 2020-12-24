const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.user = require('./user.model')
db.role = require('./role.model')
db.role = require('./location.model')

db.Roles = ['users', 'admin']

module.exports = db