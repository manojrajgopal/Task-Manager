// components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import CommentSection from './CommentSection';
import './TaskList.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTask, setExpandedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/tasks`);
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setIsLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const toggleTaskExpansion = (taskId) => {
    if (expandedTask === taskId) {
      setExpandedTask(null);
    } else {
      setExpandedTask(taskId);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${BACKEND_URL}/tasks/${taskId}`);
      // Animate deletion
      const taskElement = document.getElementById(`task-${taskId}`);
      if (taskElement) {
        taskElement.classList.add('deleting');
        setTimeout(() => {
          fetchTasks();
        }, 300);
      } else {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSave = () => {
    setEditingTask(null);
    fetchTasks();
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    try {
      await axios.patch(`${BACKEND_URL}/tasks/${taskId}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const clearAllCompleted = async () => {
    if (window.confirm('Are you sure you want to clear all completed tasks?')) {
      try {
        const completedTasks = tasks.filter(task => task.completed);
        for (const task of completedTasks) {
          await axios.delete(`${BACKEND_URL}/tasks/${task.id}`);
        }
        fetchTasks();
      } catch (error) {
        console.error('Error clearing completed tasks:', error);
      }
    }
  };
  
  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(term) || 
        task.description.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="task-manager-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">✓</span>
            Task Manager
          </h1>
          <p className="app-subtitle">Organize your work and life, finally.</p>
        </div>
        <div className="header-decoration">
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
          <div className="decoration-circle"></div>
        </div>
      </header>

      <main className="app-main">
        <div className="task-manager-content">
          <section className="task-form-section">
            <TaskForm task={editingTask} onSave={handleSave} />
          </section>

          <section className="task-list-section">
            <div className="section-header">
              <h2>Your Tasks <span className="task-count">({filteredTasks.length})</span></h2>
              <div className="controls-row">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <svg className="search-icon" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </div>
                <div className="tasks-filter">
                  <button 
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('pending')}
                  >
                    Pending
                  </button>
                  <button 
                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('completed')}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>

            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">{tasks.length}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{pendingCount}</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{completedCount}</span>
                <span className="stat-label">Completed</span>
              </div>
              {completedCount > 0 && (
                <button className="clear-completed-btn" onClick={clearAllCompleted}>
                  Clear Completed
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your tasks...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>No tasks found</h3>
                <p>{
                  filter === 'all' && !searchTerm
                    ? "You don't have any tasks yet. Add one above to get started!" 
                    : `No ${filter} tasks${searchTerm ? ` matching "${searchTerm}"` : ''}. Try changing filters.`
                }</p>
              </div>
            ) : (
              <div className="tasks-container">
                {filteredTasks.map((task, index) => (
                  <div key={task.id}>
                    <div 
                      id={`task-${task.id}`}
                      className={`task-item ${task.completed ? 'completed' : ''}`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="task-content">
                        <div 
                          className="task-checkbox"
                          onClick={() => toggleTaskCompletion(task.id, task.completed)}
                        >
                          {task.completed && (
                            <svg className="checkmark" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          )}
                        </div>
                        <div className="task-details">
                          <h3 className="task-title">{task.title}</h3>
                          <p className="task-description">{task.description}</p>
                          <div className="task-meta">
                            <span className="task-date">
                              Created: {new Date(task.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                            <button 
                              className="comment-toggle-btn"
                              onClick={() => toggleTaskExpansion(task.id)}
                              aria-label={expandedTask === task.id ? "Hide comments" : "Show comments"}
                            >
                              {task.comments && task.comments.length > 0 
                                ? `${task.comments.length} comment${task.comments.length !== 1 ? 's' : ''}` 
                                : 'Add comment'}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="task-actions">
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(task)}
                          aria-label="Edit task"
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(task.id)}
                          aria-label="Delete task"
                        >
                          <svg viewBox="0 0 24 24">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {expandedTask === task.id && (
                      <CommentSection 
                        taskId={task.id} 
                        comments={task.comments || []} 
                        onCommentUpdate={fetchTasks}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Task Manager | Stay organized, stay productive</p>
      </footer>
    </div>
  );
};

export default TaskList;