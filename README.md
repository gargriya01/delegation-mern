Task Delegation System (MERN Stack)

A role-based Task Delegation System built using the MERN stack (MongoDB, Express, React, Node.js).
Admins can create users (doers), assign tasks, and track progress.
Users can log in, view tasks, and update their status.

🚀 Features
🔑 Authentication & Authorization

User registration & login (JWT-based)

Role-based access control (Admin / User)

👨‍💻 Admin Capabilities

Manage users (add/view)

Assign tasks to users

View all tasks with timestamps

Track task progress

🙋 User Capabilities

View assigned tasks

Update task status (Pending → In Progress → Completed)

Revise or reopen tasks if required

📂 Project Structure
mern-delegation
│
├── server                  # Backend (Node.js + Express + MongoDB)
│   ├── package.json
│   ├── .env                # DB_URI, JWT_SECRET, PORT
│   ├── server.js
│   ├── models
│   │   ├── User.js
│   │   └── Task.js
│   ├── middleware
│   │   ├── auth.js
│   │   └── roles.js
│   └── routes
│       ├── auth.js
│       ├── users.js
│       └── tasks.js
│
├── client                  # Frontend (React + Vite)
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── context
│       │   └── AuthContext.jsx
│       ├── components
│       │   ├── ProtectedRoute.jsx
│       │   ├── Navbar.jsx
│       │   ├── TaskForm.jsx
│       │   ├── TaskList.jsx
│       │   └── DoerList.jsx
│       └── pages
│           ├── Login.jsx
│           ├── AdminDashboard.jsx
│           └── UserDashboard.jsx

⚙️ Tech Stack

Frontend: React, Vite, Axios, Context API, TailwindCSS (optional)

Backend: Node.js, Express.js, JWT, bcrypt

Database: MongoDB (Mongoose ODM)

🛠️ Setup & Installation
1️⃣ Clone Repository
git clone https://github.com/yourusername/mern-delegation.git
cd mern-delegation

2️⃣ Setup Backend
cd server
npm install


Create a .env file inside /server:

PORT=5000
DB_URI=mongodb+srv://<your_mongo_url>
JWT_SECRET=yourSecretKey


Run backend:

npm start

3️⃣ Setup Frontend
cd ../client
npm install
npm run dev

📌 API Endpoints
🔐 Auth Routes (/api/auth)

POST /register → Register new user

POST /login → User login & JWT token

👤 User Routes (/api/users)

GET / → Get all users (Admin only)

📋 Task Routes (/api/tasks)

POST / → Create new task (Admin)

GET / → Get all tasks (Admin)

GET /my-tasks → Get tasks for logged-in user

PUT /:id → Update task status

📸 Screens (Expected)

Login Page

Admin Dashboard (assign tasks, view doers, track tasks)

User Dashboard (view & update tasks)

✅ Future Enhancements

Email notifications for new tasks

File upload with tasks

Analytics dashboard for admins
