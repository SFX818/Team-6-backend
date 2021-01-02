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

    // --- TEST ROUTES --- //

    app.get('/api/test/all', controller.allAccess)

    app.get('/api/test/user', [authJwt.verifyWebToken], controller.userBoard)

    app.get('/api/test/admin', [authJwt.verifyWebToken, authJwt.isAdmin],
    controller.adminBoard)

    // --- ADMIN ROUTES --- 
    
    // *********** isAdmin is crashing the app

    // Admin route to view all users
    app.get('/admin/users/all', [authJwt.verifyWebToken, authJwt.isAdmin], controller.findAllUsers)
    // Admin routes to update user fields
    app.get('/admin/users/:id', [authJwt.verifyWebToken, authJwt.isAdmin], controller.findUser)
    app.put('/admin/users/:id', [authJwt.verifyWebToken, authJwt.isAdmin], controller.updateUser)
    // Admin route to delete users
    app.delete('/admin/users/:id', [authJwt.verifyWebToken, authJwt.isAdmin], controller.deleteUser)
    
    // Route to pull all roles
    app.get('/admin/roles', [authJwt.verifyWebToken, authJwt.isAdmin], controller.findRoles)

    // --- TEST ROUTES FOR PRE-API APP -- //
    // Add location to search history // **TEMPORARY - Will need refactoring with API **
    app.post('/search/history/:id',[authJwt.verifyWebToken], controller.addToSearchLocations)
    // View user profile // ** May be deleted or combined with other routes later **
    app.get('/profile', [authJwt.verifyWebToken], controller.viewProfile)

    
    // --- USER DASHBOARD ROUTES --- //

    // View favorite locations and search history
    app.get('/dashboard/favorites', [authJwt.verifyWebToken], controller.findAllFavoriteLocations)
    app.get('/dashboard/history', [authJwt.verifyWebToken], controller.findAllSearchLocations)
    app.get('/dashboard/primary-location', [authJwt.verifyWebToken], controller.findPrimaryLocation)
    
    // Edit primary location
    app.put('/dashboard/edit/:id', [authJwt.verifyWebToken], controller.editPrimaryLocation)

    // Remove a location from favorites
    app.delete('/dashboard/favorites/remove/:id', [authJwt.verifyWebToken], controller.removeFromFavorites)

    // Add location to favorites
    app.post('/search/:id',[authJwt.verifyWebToken], controller.addToFavoriteLocations)

}