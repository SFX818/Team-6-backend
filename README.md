# Team-6-Project
## Binary Beasts

[Trello](https://trello.com/b/oK1WjNdG/project-3)

[ERD](https://lucid.app/lucidchart/invitations/accept/6b16b9ed-aa9e-46ed-a7b1-5bc2c02922f5)

[Front End Repo](https://github.com/SFX818/team-6-frontend)

[Back End Deployment](https://cov-id-backend.herokuapp.com/)

# Route Table

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
GET | /about | About us page
POST | /api/auth/signup | submit sign up form
POST | /api/auth/signin | submit login
POST | /api/location | Location search - finds existing lcoation in local DB or creates a new one from external API
POST | /api/location/search/:id | add location to searchLocations array
PUT | /admin/users/:id | Add a role to a user
PUT | /admin/users/:id/remove | Remove a role from a user
PUT | /dashboard/edit/:id | Edit primary location
PUT | /dashboard/history/remove | Removes the first element of the searchLocations array
PUT | /api/location/:id | Edit a specific location
DELETE | /admin/users/:id/delete | Delete a user
DELETE | /dashboard/favorites/remove/:id | Delete a specific location from a user's favorites
DELETE | /api/location/:id | Delete a specific location from local database
