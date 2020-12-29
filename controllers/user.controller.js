const { db } = require("../models/user.model")
const User = require("../models/user.model")
const Location = require("../models/location.model")

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
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || 'An error occurred while retrieving users'
            })
        })
}

// View one user's details
exports.findUser = (req, res) => {
    const id = req.params.id
    User.findById(id).then(data => {
        if(!data)
        return res.status(400).send({message: `User with id:${id} not found`})
        else return res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || 'An error occurred while retrieving user'
        })
    })
}

// Update a user's details
exports.updateUser = (req, res) => {
    const id = req.params.id
    // this option allows admin to completely overwrite the user's roles
    User.updateOne(
        {_id:id},
        {
            username: req.body.username,
            email: req.body.email,
            roles: req.body.roles
        })
        .then(data => {
            if(!data)
            return res.status(400).send({message: `User with id: ${id} not found`})
            else return res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || 'An error occurred while updating user'
            })
        })
    
    // this option pushes the new role into the array. Would need an additional function to remove roles without deleting user

    // User.findById(id).then(data => {
    //     if(!data) return res.status(400).send({message: `User with id:${id} not found`})
    //     data.roles.push(req.body.roles)
    //     data.save(err=>{
    //         if(err) {
    //             res.status(500).send({
    //             message:
    //             err.message || 'An error occurred while updating user'
    //             })
    //         }
    //         res.send('User saved', data)
    //     })
    // })
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
    Location.findOne({_id: id})
    .exec((err, data) => {
        if(err)
        return res.status(400).send({message: `Location with id: ${id} not found`})
        else {
            User.updateOne(
                {_id: req.userId},
                {primaryLocation: data})
            res.send({message: 'Primary location update successful'})
        }
    })
}

// DELETE // Delete from Favorite Locations
exports.removeFromFavorites = (req,res) => {
    const id = req.body.id
    User.findOneAndUpdate({_id: req.userId},
        {$pull: {favoriteLocations: {_id: id}}},
        {useFindAndModify:false, new:true}
        )
    .exec((err, user) => {
        if(err)
        return res.status(400).send({message: `${err}`})
        else {
            res.send(user)
        }
    })
}