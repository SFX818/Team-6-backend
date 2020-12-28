const User = require("../models/user.model")

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

// User Dashboard routes




// DELETE // DELETE FAVORITES on Dashboard