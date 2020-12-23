const express = require('express') 
const bodyParser = require('body-parser') 
const cors = require('cors')
const app = express()

app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse request of content type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// set the port and listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})