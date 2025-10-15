# Notes Sharing App

A simple note-sharing application with user authentication, CRUD operations for notes, and optional markdown support. Built with **React (Vite)** for the frontend and **FastAPI** for the backend.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Running the App](#running-the-app)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- **User Authentication**  
  - Register new users  
  - Login with username/email and password  
  - Logout functionality  

- **Notes Management**  
  - Create, view, edit, and delete notes  
  - Notes linked to the logged-in user  
  - Markdown support with live preview  
  - Search notes by title or content  

- **Frontend / Backend Communication**  
  - React frontend consumes FastAPI endpoints  
  - Token-based authentication (JWT)  

---


---

## Tech Stack

**Backend:**  
- Python 3.11+  
- FastAPI  
- SQLAlchemy  
- SQLite (default DB)  
- Pydantic  
- JWT for authentication  

**Frontend:**  
- React 19+  
- Vite  
- Bootstrap 5  
- React Markdown & Textarea Autosize  

---

## Installation

### Backend

1. Navigate to the backend folder:

```bash
cd backend

python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows
```

### Install dependencies 
```bash
pip install -r requirements.txt
```

### Run the backend
```bash
uvicorn app.main:app --reload
```

### Frontend

### Navigate to the frontend folder:
```bash 
cd frontend
```
### Install dependencies
```bash 
npm install
```
### Start the development server 
```bash
npm run dev
```

### Open your browser 
http://localhost:5173/

### Usage

- Register a new user
- Login with your credentials
- Create a note with a title and markdown content
- Edit or delete notes
- Search notes using the search bar
- Logout when finished
