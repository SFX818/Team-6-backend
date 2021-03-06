const config = require('../config/auth.config')
const db = require('../models/index')

const User = db.user
const Role = db.role

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = (req, res) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        primaryLocation: {'country': req.body.primaryLocation.country,
                        'state': req.body.primaryLocation.state,
                        'city': req.body.primaryLocation.city,
                        'county': req.body.primaryLocation.county
                        }
    })

    user.save((err, user) => {
        if(err) {
            res.status(500).send({message: err})
            return
        }

        if(req.body.roles) {
            Role.find({
                name: {$in: req.body.roles}
            }, (err, roles) => {
                if(err) {
                    res.status(500).send({message: err})
                    return
                }

                user.roles = roles.map(role => role._id)

                user.save(err => {
                    if(err) {
                        res.status(500).send({message: err})
                        return
                    }

                    res.send({message: 'User created successfully!'})
                })
            })

        // every user that doesn't have a role will automatically get a user role
        } else {
            Role.findOne({name: 'user'}, (err,role) => {
                if(err) {
                    res.status(500).send({message: err})
                    return
                }

                // just assign user role id to document
                user.roles = [role._id]

                user.save(err => {
                    if(err) {
                        res.status(500).send({message: err})
                        return
                    }
                    res.send({message: 'user was registered successfully!'})
                })
            })
        }
    })
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .populate('roles', '-__v')
    .exec((err, user) => {
        if(err) {
            res.status(500).send({message: err})
            return
        }

        // user did not exist
        if(!user) {
            return res.status(404).send({message: '404\'d! User not found'})
        }

        // validates the password by passing req.body password and the passowrd returned from db over to bcrypt to unhash and compare
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!passwordIsValid) {
            return res.status(401).send({accessToken: null, message: 'invalid password'})
        }

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // token expires in 24 hours
        })

        // setting roles to pass back in our response
        let authorities = []

        for(let i=0; i<user.roles.length; i++) {
            authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        })
    })

}