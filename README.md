# Team-6-Project
## Binary Beasts

[Trello](https://trello.com/b/oK1WjNdG/project-3)

[ERD](https://lucid.app/lucidchart/invitations/accept/6b16b9ed-aa9e-46ed-a7b1-5bc2c02922f5)

# Route Table

CRUD Action | Route | Description
----- | ----- | -----
GET | / | Home
GET | /signup | Sign up form
GET | /login | Log in form
GET | /admin/users/all | Admin page displaying all users
GET | /admin/users/:id | Detail page for one user
GET | /dashboard/favorites | User dashboard - favorites
GET | /dashboard/history | User dashboard - search history
GET | /search | Location search
GET | /results | Search results (list)
GET | /results/:id | Search result detail (one)
GET | /about | About us page
POST | /signup | submit sign up form
POST | /login | submit login
PUT | /admin/users/:id | Edit user roles/info
POST | /search | submit location search
PUT | /dashboard | Edit dashboard/favorites (add favorites?)
DELETE | /admin/users/:id | Delete a user
DELETE | /dashboard | Delete favorites
