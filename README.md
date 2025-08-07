# 📝 Task Manager Application (Local JSON Storage)

A full-stack Task Management app where users can register, log in, and manage their tasks. All user and task data are securely stored in local `.json` files, making it simple and ideal for small projects, offline use, or learning purposes.

---

## 🚀 Features

### ✅ User Accounts
- **Register & Login**: Secure user authentication using JWT.
- **Password Security**: Passwords are hashed and stored in a local JSON file.
- **Protected Routes**: Only authenticated users can access task data.

### 🗂️ Task Management (CRUD)
- **Create**: Add tasks with a title, description, and status.
- **Read**: View all tasks for the logged-in user.
- **Update**: Edit task details or change their status.
- **Delete**: Remove tasks.
- **Filter & Sort**: Filter tasks by status and sort by creation date.

### 🖥️ User Interface
- **Responsive Design**: Works on both mobile and desktop.
- **User Feedback**: Displays validation errors and success messages.
- **Simple & Clean**: User-friendly dashboard and forms.

---

## 🔌 RESTful API Endpoints

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| POST   | `/register`      | Register a new user       |
| POST   | `/login`         | Authenticate and get token|
| GET    | `/tasks`         | Get all user's tasks      |
| POST   | `/tasks`         | Create a new task         |
| PUT    | `/tasks/:id`     | Update task by ID         |
| DELETE | `/tasks/:id`     | Delete task by ID         |

> All `/tasks` routes require a valid JWT token.

---

## 💾 Data Persistence

All data is stored in `.json` files in the `data/` directory:

- `users.json` – Stores user credentials (hashed)
- `tasks.json` – Stores tasks with user ownership

No external database required.

---

## 🛠️ Tech Stack

- **Frontend**: React / HTML / CSS
- **Backend**: Node.js + Express
- **Storage**: Local JSON files
- **Authentication**: JWT

---

## 📁 Project Structure

```
xcelcode -Task/
├── backend/
│   ├── index.js           # Express server (API, auth, CRUD)
│   ├── package.json       # Backend dependencies & scripts
|   ├── data/
│   |   ├── users.json     # User data (hashed passwords)
│   |   ├── tasks.json     # Task data (per user)
│   ├── controllers/       # Controller modules
│   ├── routes/            # Route modules
│   ├── middleware/        # Middleware modules
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/    # React components (forms, header, etc.)
│   │   ├── pages/         # React pages (Login, Register, Homepage, etc.)
│   │   ├── App.js         # Main React app
│   │   └── ...
│   ├── public/
│   ├── package.json       # Frontend dependencies & scripts
│   └── ...
├── README.md
└── ...
```

---

## ⚙️ Setup & Run

### 1. Clone the Repo
```sh
git clone https://github.com/Prince61141/task-management-xcelcode.git
cd task-manager-app
```

### 2. Backend Setup
```sh
cd backend
npm install
npm start
# Runs on http://localhost:5000
```

### 3. Frontend Setup
```sh
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

---

## 💡 Usage

1. Register a new account
2. Log in to receive a JWT token
3. Create, view, update, and delete your tasks
4. Filter tasks by status or sort by date
5. Log out to end your session

---

## 🎬 Demo

Or watch the screencast: [Demo Video](https://drive.google.com/drive/folders/17Z0T8mnB8cT_8_SzS-DJIko3eFdigEfZ?usp=drive_link)


---

## License 📄

This project is licensed under the [MIT License](LICENSE).

## Contact 📧

For questions or feedback, please contact [Prince Ghoda](mailto:princepatel61141@gmail.com).