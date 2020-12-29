const location = require("../controllers/search.controller.js")
let router = require("express").Router();

module.exports = app => {
    // Create a new Location
    router.post("/", location.create)

    // Retrieve all Locations
    router.get("/", location.findAll);

    // // Retrieve a single Location with id
    router.get("/:id", location.findOne);

    // Update a location with id
    router.put("/:id", location.update);

    // // Delete a Location with id
    router.delete("/:id", location.delete);

    // // Retrieve all favorite locations
    router.get("/favorite", location.findAllFavoriteLocations);

    // Retrieve all search locations
    router.get("/history", location.findAllSearchLocations);

    // Api
    app.use('/api/location', router)
}

