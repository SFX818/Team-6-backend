const db = require('../models/index')
const Roles = db.Roles
const User = db.user

checkDuplicateUsernameorEmail = (req, res, next) => {
    // look in our user database and see if the user exists
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({message: err})
            return
        }
        if(user) {
            res.status(400).send({message:'sign up failed. username already exists'})
            return
        }
        
        // check for email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if(err) {
                res.status(500).send({message: err})
                return
            }
            if(user) {
                res.status(400).send({message:'sign up failed. email already in use'})
                return
            }
            next()
            
        })
    })
}

checkRolesExisted = (req,res,next) => {
    if(req.body.roles) {
        for(let i=0; i< req.body.roles.length; i++) {
            if(!Roles.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                })
                return
            }
        }
    }
    next()
}

const verifySignUp = {
    checkDuplicateUsernameorEmail,
    checkRolesExisted
  }

  module.exports = verifySignUp