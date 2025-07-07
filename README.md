# 📝 Blogging Platform

A full-stack **Blogging Platform** built using the MERN Stack
(MongoDB, Express.js, React.js, Node.js). This platform allows users to register,
create blog posts, view others' blogs, and manage their own content in a secure 
and efficient manner.

## 🚀 Features

- 🧑‍💻 User Registration & Login (JWT Authentication)
- ✍️ Create, Edit, and Delete Blog Posts
- 📄 View all published blogs
- 🔒 Protected routes for authenticated users
- 💬 Clean and responsive UI
- 🌐 RESTful API for all operations

## 🛠️ Tech Stack

### Frontend:
- React.js
- React Router DOM
- Axios
- Tailwind CSS (or plain CSS, based on project)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Authentication
- bcrypt.js for password hashing
- CORS and dotenv configuration

## 📂 Project Structure


Blogging-Platform/
│
├── backend/ # Express + MongoDB API
│ ├── models/ # Mongoose Models (User, Blog)
│ ├── routes/ # Route files (auth, blogs)
│ ├── controllers/ # Logic for each route
│ └── server.js # Main server file
│
├── frontend/ # React App
│ ├── components/ # Reusable components
│ ├── pages/ # Pages like Home, Login, Register, Dashboard
│ └── App.js # Routing Setup
│
└── README.md # Project documentation

🚀 Features
User registration and login with JWT authentication

Create, edit, delete and read blog posts

Rich-text editor using CKEditor

Stylish and responsive UI with shadcn/ui

Icons using react-icons

Protected routes for authenticated users

RESTful API integration

🛠️ Tech Stack
Frontend:

React.js

React Router DOM

Axios

shadcn/ui (Tailwind-based UI components)

CKEditor (rich text editing)

react-icons

Backend:

Node.js

Express.js

MongoDB (Mongoose)

JWT for authentication

bcrypt.js for password hashing

dotenv for environment configuration

CORS middleware

📁 Folder Structure Overview
Blogging-Platform/

backend/

controllers/

models/

routes/

server.js

frontend/

components/

pages/

App.js

README.md

⚙️ How to Run the Project
Clone the repository:
git clone https://github.com/Akbhardwaj5959/Blogging-Platform.git

Install and run backend:

Navigate to backend folder

Run: npm install

Create a .env file with the following:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

Start the backend server: npm start

Install and run frontend:

Navigate to frontend folder

Run: npm install

Start frontend: npm start

🌐 API Endpoints Summary
POST /api/auth/register → Register a new user

POST /api/auth/login → User login

POST /api/blogs → Create a blog post

GET /api/blogs → Get all blogs

GET /api/blogs/:id → Get a single blog

PUT /api/blogs/:id → Update a blog

DELETE /api/blogs/:id → Delete a blog


