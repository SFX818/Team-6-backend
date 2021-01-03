const User = require("../models/user.model")
const Location = require("../models/location.model")
const Role = require("../models/role.model")

// Test routes
exports.allAccess = (req,res) => {
    res.status(200).send('public content')
}

exports.userBoard = (req, res) => {
    res.status(200).send('User content')
}

exports.adminBoard = (req, res) => {
    res.status(200).send('Admin content')
}

// Admin-only routes

// View all users
exports.findAllUsers = (req,res) => {
    User.find()
    .populate('roles')
    .exec((err, data) => {
        if(err) {
            return err
         } else {
             res.send(data)
         }
    })
}

// View one user's details
exports.findUser = (req, res) => {
    const id = req.params.id
    User.findById(id)
    .populate('roles')
    .exec((err, data) => {
        if(err) {
            return err
        } else {
            res.send(data)
        }
    })
}

// Get all roles
exports.findRoles = (req,res) => {
    Role.find()
    .exec((err, data) => {
        if(err) {
            return err
         } else {
             res.send(data)
         }
    })
}

// Add a role to a user
exports.addUserRole = (req, res) => {
    const id = req.params.id
    User.findByIdAndUpdate(id)
        .then(data => {
            if(!data) return res.status(400).send({message: `User with id:${id} not found`})
            data.roles.addToSet(req.body.roles)
            data.save(err=>{
                if(err) {
                    res.status(500).send({
                    message:
                    err.message || 'An error occurred while updating user'
                    })
                }
                res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
              message: err.message || 'An error occurred while retrieving favorite locations'
            })
        })
    })

}

exports.removeUserRole = (req,res) => {
    const id = req.params.id
    User.findById(id)
    .then(data => {
        if(!data) return res.status(400).send({message: `User with id:${id} not found`})
        data.roles.pull(req.body.roles)
        data.save(err=>{
            if(err) {
                res.status(500).send({
                message:
                err.message || 'An error occurred while updating user'
                })
            }
            res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving favorite locations'
        })
    })
    })
}


// Delete a user
exports.deleteUser = (req,res) => {
    const id = req.params.id
    User.deleteOne({_id: id})
    .then(data => {
        if(!data)
        return res.status(400).send({message: `User with id: ${id} not found`})
        else return res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || 'An error occurred while deleting user'
        })
    })
}


// USER DASHBOARD ROUTES //

// PUSH // Add location to favorites
exports.addToFavoriteLocations = (req, res) => {
    const id = req.params.id
    User.updateOne(
        {_id: req.userId},
        {$addToSet: {favoriteLocations: id}}
    )
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving favorite locations'
        })
    })
}

// PUSH // Add location to search history (can have duplicates) // Want to limit array length to 20
exports.addToSearchLocations = (req, res) => {
    const id = req.params.id
    User.updateOne(
        {_id: req.userId},
        {$push: {searchLocations: id}}
    )
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving search locations'
        })
    })
}


// GET // View User's info
exports.viewProfile = (req,res) => {
    User.findOne({_id: req.userId}).then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving user data'
        })
    })
}


// GET // View Favorite Locations
exports.findAllFavoriteLocations = (req, res) => {
    User.findOne({_id: req.userId})
   .populate('favoriteLocations')
   .exec(function(err, user) {
       if(err) {
           return err
        } else {
            res.send(user.favoriteLocations)
        }
   })
}

// GET // Primary Location
exports.findPrimaryLocation = (req, res) => {
    User.findOne({_id: req.userId})
   .exec(function(err, user) {
       if(err) {
           return err
        } else {
            res.send(user.primaryLocation)
        }
   })
}

// GET // View Search Locations
exports.findAllSearchLocations = (req, res) => {
    User.findOne({_id: req.userId})
   .populate('searchLocations')
   .exec(function(err, user) {
       if(err) {
           return res.status(400).send({message: `User with id: ${req.userId} not found`})
        } else {
            res.send(user.searchLocations)
        }
   })
}

// PUT // Edit Primary Location
exports.editPrimaryLocation = (req, res) => {
    const id = req.body.id
    const city = req.body.city
    const state = req.body.state
    const country = req.body.country
    const county = req.body.county
    User.updateOne(
        {_id: req.userId},
        {$set: {primaryLocation: {
            _id: id,
            city: city,
            state: state,
            country: country,
            county: county
        }}}
    )
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving favorite locations'
        })
    })
}



// DELETE // Delete from Favorite Locations
// exports.removeFromFavorites = (req,res) => {
//     const id = req.body.id
//     User.findOneAndUpdate({_id: req.userId},
//         {$pull: {favoriteLocations: {_id: id}}},
//         {useFindAndModify:false, new:true}
//         )
//     .exec((err, user) => {
//         if(err)
//         return res.status(400).send({message: `${err}`})
//         else {
//             res.send(user)
//         }
//     })
// }

exports.removeFromFavorites = (req, res) => {
    const id = req.params.id
    User.updateOne(
        {_id: req.userId},
        {$pull: {favoriteLocations: id}}
    )
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving favorite locations'
        })
    })
}
