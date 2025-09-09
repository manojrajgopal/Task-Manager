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

2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string
```

3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env if you need to change backend URL
```

---

## Configuration
### Backend Environment Variables (.env)
```bash
MONGO_URI=mongodb://localhost:27017
DB_NAME=taskmanager
```

### Frontend Environment Variables (.env)

```bash
REACT_APP_BACKEND_URL=http://localhost:8000
```

---

## Running the Application

1. Start Backend Server
```bash
cd backend
python -m uvicorn main:app --reload
```
Backend will be available at: http://localhost:8000

2. Start Frontend Development Server

```bash
cd frontend
npm install
npm start
```
Frontend will be available at: http://localhost:3000

---

## 📚 API Documentation

### Tasks Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/tasks`            | Get all tasks            |
| POST   | `/tasks`            | Create a new task        |
| PUT    | `/tasks/{task_id}`  | Update a task            |
| PATCH  | `/tasks/{task_id}`  | Partially update a task  |
| DELETE | `/tasks/{task_id}`  | Delete a task            |

---

### Comments Endpoints

| Method | Endpoint                                   | Description           |
|--------|--------------------------------------------|-----------------------|
| POST   | `/tasks/{task_id}/comments`                | Add comment to task   |
| PUT    | `/tasks/{task_id}/comments/{comment_id}`   | Update comment        |
| DELETE | `/tasks/{task_id}/comments/{comment_id}`   | Delete comment        |

---

## 📌 Example API Requests

### Create a Task
```bash
curl -X POST "http://localhost:8000/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task manager application",
    "completed": false
  }'
```

### Add a Comment
```bash
curl -X POST "http://localhost:8000/tasks/{task_id}/comments" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is an important task!"
  }'
```

---

## 🎨 UI Components
### TaskList
- Displays all tasks with filtering and search capabilities
- Shows task statistics and completion status
- Provides task management controls (edit, delete, toggle completion)

### TaskForm
- Clean form for creating and editing tasks
- Floating labels and smooth animations
- Validation and error handling

### CommentSection
- Nested comments for each task
- Real-time comment management
- Edit and delete functionality

---

## 🔧 Development

### Building for Production
```bash
# Build frontend
cd frontend
npm install
npm run build

# The build folder contains optimized production files
```

### Code Style
- Backend: Follows PEP 8 guidelines
- Frontend: Uses ESLint and Prettier for consistent formatting
- Components: Functional components with React hooks
- Styling: CSS modules with consistent naming conventions

---

## 🌐 Deployment
### Backend Deployment (Example: Heroku)
```bash
# Add Procfile
web: uvicorn main:app --host=0.0.0.0 --port=$PORT

# Deploy
git push heroku main
```

### Frontend Deployment (Example: Netlify)
```bash
# Build and deploy
npm run build
# Upload build folder to Netlify
```

---

## Environment Variables for Production
Set these in your deployment platform:

### Backend
- MONGO_URI: Your production MongoDB connection string
- DB_NAME: Production database name

### Frontend
- REACT_APP_BACKEND_URL: Your production backend URL

---

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

## 🆘 Support
If you encounter any issues or have questions:
1. Check the API documentation
2. Review the browser console for frontend errors
3. Check the backend server logs for API errors
4. Open an issue on GitHub with detailed information

---

## 🙏 Acknowledgments
- FastAPI team for the excellent web framework
- React team for the powerful frontend library
- MongoDB for the flexible database solution
- Material Design for UI inspiration

---