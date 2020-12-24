const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models/index')

const User = db.user
const Role = db.role

// Function to verify our user has a valid token

verifyWebToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if(!token) {
        return res.status(403).send({message: 'No token provided!'})
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({message: 'Unauthorized'})
        }
        req.userId = decoded.userId
        next()
    })
}

// Function to verify if user is admin or not

isAdmin = (req,res,next) => {
    User.findOne({username: req.body.username}).exec((err, user)=>{
        console.log(user)
        if(err) {
            return res.status(500).send({message:err})
        }
        Role.find({
            _id: {$in: user.roles}
        }, (err, roles)=> {
            if(err) {
                return res.status(500).send({message: err})
            }
            
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === 'admin') {
                    next()
                    return
                }
            }

            res.status(403).send({message: `Requires admin role`})
        })
    })
}

const authJwt = {
    verifyWebToken,
    isAdmin
}

module.exports = authJwt