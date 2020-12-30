const location = require("../controllers/search.controller.js")
const { authJwt } = require('../middleware')

module.exports = app => {
    
    let router = require("express").Router();

    //  Create a new Location
    router.post("/", location.findOrCreate)

    // Retrieve all Locations
    // router.get("/", location.findAll);

    // // Retrieve a single Location with id
    router.get("/:id", location.findOne);

    // Add to favorite locations
    router.get("/favorite/:id", [authJwt.verifyWebToken],location.addToFavoriteLocations);

    // Retrieve all search locations
    router.get("/history/:id", [authJwt.verifyWebToken], location.addToSearchLocations);

    // Api
    app.use('/api/location', router)
}

    // Update a location with id
    // router.put("/:id", location.update);

    // Delete a Location with id
    // router.delete("/:id", location.delete);
