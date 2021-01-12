# COV-ID
## Binary Beasts

[ERD](https://lucid.app/lucidchart/invitations/accept/6b16b9ed-aa9e-46ed-a7b1-5bc2c02922f5)

[Front End Repo](https://github.com/SFX818/team-6-frontend)

[Back End Deployment](https://cov-id-backend.herokuapp.com/)

BACKEND

• explanation of backend tech used
• general approach (a couple paragraphs)
• installation instructions
• table with RESTful routes & resources available at each endpoint
• unsolved problems / major hurdles

# Backend Technology Used
- MongoDB/Mongoose
- Node.js
- Express

# General Approach
Since the majority of this app is in the frontend, we tried to keep the backend farily streamlined. We ended up creating CRUD routes for all the models, even though the location data was ultimately going to be supplied from an API search. Even though we didn't need all the routes we created in the finished product, it was helpful to have a quick way "in" to fix things.

We knew it wouldn't make sense to save the Covid-19 statistics in our database since the data was constantly being updated, but we did want to store the locations as they were searched to improve the app's performance. We also of course created models for the user data and roles (Admin and User). We decided early in development that the Location model would be used for both the users' favoriteLocations and searchHistory, and that saved us from having to build an additional (and repetitive!) model.


# Installation Instructions
- Create a new directory and cd into it
- npm init and npm i to download all dependencies
- create a mongoDB database and initialize it
    - User and Admin Roles should automatically populate
- Create your first admin user - please note your first admin MUST be created in the backend
- Continue to frontend installation

# RESTful Route Table

CRUD Action | Route | Description
----- | ----- | -----
GET | / or /home | Home
GET | /admin/users/all | Admin page displaying all users
GET | /admin/users/:id | Admin page displaying details for one user
GET | /admin/roles | Admin page displaying all roles
GET | /dashboard/favorites | View user's favorites list
GET | /dashboard/history | View user's search history
GET | /dashboard/primary-location | View user's primary location
GET | /api/location | View all locations
GET | /api/location/:id | View one location
POST | /api/auth/signup | submit sign up form
POST | /api/auth/signin | submit login
POST | /api/location | Location search - finds existing location in local DB or creates a new one from external API
POST | /api/location/search/:id | add location to searchLocations array
PUT | /admin/users/:id | Add a role to a user
PUT | /admin/users/:id/remove | Remove a role from a user
PUT | /dashboard/edit/:id | Edit primary location
PUT | /dashboard/history/remove | Removes the first element of the searchLocations array
PUT | /api/location/:id | Edit a specific location
DELETE | /admin/users/:id/delete | Delete a user
DELETE | /dashboard/favorites/remove/:id | Delete a specific location from a user's favorites
DELETE | /api/location/:id | Delete a specific location from local database

# Acknowledgements
- Thank you to our General Assembly instructors and IAs - Billie, Mateen, Fatima, and Khoury for your help and support

[Front End Repo](https://github.com/SFX818/team-6-frontend)

[Back End Deployment](https://cov-id-backend.herokuapp.com/)
