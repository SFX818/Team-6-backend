# Team-6-Project
## Binary Beasts

[Trello](https://trello.com/b/oK1WjNdG/project-3)

[ERD](https://lucid.app/lucidchart/invitations/accept/6b16b9ed-aa9e-46ed-a7b1-5bc2c02922f5)

# Wireframes
![Home](/Wireframes/Home.png)
![SignUp](/Wireframes/signup.png)
![LogIn](/Wireframes/login.png)
![Dashboard](/Wireframes/Dashboard.png)
![Search](/Wireframes/search.png)
![Results](/Wireframes/results.png)
![Details](/Wireframes/details.png)
![About](/Wireframes/about.png)
![NavBar](/Wireframes/NavBar.png)

# Route Table

CRUD Action | Route | Description
----- | ----- | -----
GET | / | Home
GET | /signup | Sign up form
GET | /login | Log in form
GET | /admin | Admin page
GET | /dashboard | User dashboard
GET | /search | Location search
GET | /results | Search results (list)
GET | /:id | Search result detail (one)
GET | /about | About us page
POST | /signup | submit sign up form
POST | /login | submit login
PUT | /admin | Edit user roles/data
POST | /search | submit location search
PUT | /dashboard | Edit dashboard/favorites (add favorites?)
DELETE | /admin | Delete users
DELETE | /dashboard | Delete favorites
