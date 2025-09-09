# Task Manager - Full Stack Application

---

### A modern, responsive task management application built with React frontend and FastAPI backend, featuring MongoDB for data storage. This application allows users to create, edit, delete tasks, and manage comments with a sleek, intuitive interface.

---

## 🚀 Features

### Core Functionality

- Task Management: Create, read, update, and delete tasks
- Task Completion: Mark tasks as completed/incomplete
- Comment System: Add, edit, and delete comments on tasks
- Search & Filter: Search tasks by title/description and filter by status
- Real-time Updates: Dynamic UI updates without page reloads

### User Experience

- Responsive Design: Works seamlessly on desktop, tablet, and mobile devices
- Modern UI: Clean, material design-inspired interface with smooth animations
- Interactive Elements: Hover effects, loading states, and visual feedback
- Accessibility: ARIA labels and keyboard navigation support

### Advanced Features

- Task Statistics: Real-time counters for total, pending, and completed tasks
- Bulk Operations: Clear all completed tasks with confirmation
- Sorting & Organization: Filter tasks by status (All, Pending, Completed)
- Animation Effects: Smooth transitions and micro-interactions

---

## 🛠️ Technology Stack

### Frontend
- React 18 - Modern React with hooks and functional components
- Axios - HTTP client for API communication
- CSS3 - Custom CSS with CSS variables and animations
- Modern JavaScript - ES6+ features and async/await

### Backend
- FastAPI - Modern, fast web framework for building APIs
- MongoDB - NoSQL database with Motor async driver
- Pydantic - Data validation and settings management
- Python 3.8+ - Async/await support

### Development Tools
- dotenv - Environment variable management
- CORS - Cross-origin resource sharing
- UVicorn - ASGI server for FastAPI

---

## 📦 Project Structure

```bash
task-manager/
├── backend/
│   ├── models/
│   │   ├── __init__.py
│   │   ├── database.py          # MongoDB connection setup
│   │   └── models.py           # Pydantic models for data validation
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── tasks.py            # Task-related API endpoints
│   │   └── comments.py         # Comment-related API endpoints
│   ├── requirements.txt        # Python dependencies
│   └── main.py                # FastAPI application entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.js     # Main task management component
│   │   │   ├── TaskForm.js     # Task creation/editing form
│   │   │   └── CommentSection.js # Comment management component
│   │   ├── services/
│   │   │   └── api.js          # API service functions
│   │   ├── App.js              # Main application component
│   │   └── index.js            # React application entry point
│   ├── styles/
│   │   ├── App.css            # Global application styles
│   │   ├── TaskList.css       # Task list component styles
│   │   ├── TaskForm.css       # Form component styles
│   │   └── CommentSection.css # Comment section styles
│   ├── package.json           # Node.js dependencies
│   └── .env                   # Frontend environment variables
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/manojrajgopal/Task-Manager.git
cd task-manager
```