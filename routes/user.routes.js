const { authJwt } = require('../middleware')
const controller = require('../controllers/user.controller')

module.exports = function(app) {
    app.use((req,res,next) => {
        // set header and allow use of x access token which we'll use to pass our token
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-type, Accept'
        )
        next()
    })

    app.get('/api/test/all', controller.allAccess)

    app.get('/api/test/user', [authJwt.verifyWebToken], controller.userBoard)

    app.get('/api/test/admin', [authJwt.verifyWebToken, authJwt.isAdmin],
    controller.adminBoard)

    // Admin route to view all users
    app.get('/admin/users/all', [authJwt.verifyWebToken, authJwt.isAdmin], controller.findAllUsers)

    // Admin routes to update user fields
    app.get('/admin/users/:id', [authJwt.verifyWebToken, authJwt.isAdmin], controller.findUser)
    app.put('/admin/users/:id', [authJwt.verifyWebToken, authJwt.isAdmin], controller.updateUser)

    // Admin route to delete users
    app.delete('/admin/users/:id', [authJwt.verifyWebToken, authJwt.isAdmin], controller.deleteUser)

}