const db = require("../models");

// grabs the location model from index where everything is brought together
const Location = db.location;

// Create and Save a new Location
exports.create = (req, res) => {
    // Validate request
    if (!req.body.city) {
        res.status(400).send({ message: "City can not be empty!" });
        return;
    }
    // Create a Location
  const location = new Location({
    city: req.body.city,
    state: req.body.state,
    country: req.body.country
});
    // Save Location in the database
    location
    .save(location)
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating location "
        })
    })
}

// find all location
exports.findAll = (req,res) => {
    Location.find({}).then(data=>{
      res.send(data)
    })
    .catch(err=>{
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials"
      })
    })
  }

    // Find a single Location with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    // Find Location by the id being passed by id
    Location.findById(id).then((data) => {
            if(!data){
                res.status(400).send({message: "Not found Location with id" + id});
            }else{
                res.send(data)
            }
    });
};


// Update a Location by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    // Find Location by the id being passed by id then update it
    Location.findByIdAndUpdate(id, {city: req.body.city, state: req.body.this.state, country: req.body.this.country}).then((data) => {
        // if(!data){
        //     res.status(400).send({message: "Not found Tutorial with id" + id});
        // }else{
            res.send(data)
        
})
.catch((err) => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials"
    })
})

};

// Delete a Location with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // Find Location by the id being passed by id then remove it
    Location.findByIdAndRemove(id, {useFindAndModify: false}).then((data) => {
        if(!data){
            res.status(400).send({message: "Not found Location with id" + id});
        }else{
            res.send(data)
        }
});
};


// Retrieve all Favorite Locations
exports.findAllFavoriteLocations = (req, res) => {
    db.user.find({favoriteLocations}).then(data=>{
        res.send(data)
      })
      .catch(err=>{
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Locations"
        })
      })
};


// Retrieve all Search Locations
exports.findAllSearchLocations = (req, res) => {
    db.user.find({searchLocations}).then(data=>{
        res.send(data)
      })
      .catch(err=>{
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving Locations"
        })
      })
};