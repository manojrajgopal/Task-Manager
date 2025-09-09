// components/TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskForm.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const TaskForm = ({ task, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFocused, setIsFocused] = useState({ title: false, description: false });
  const [completed, setCompleted] = useState(false);

    useEffect(() => {
    if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed || false);
    } else {
        setTitle('');
        setDescription('');
        setCompleted(false);
    }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (task) {
            await axios.put(`${BACKEND_URL}/tasks/${task.id}`, { 
                title, 
                description,
                completed // Include completed status
            });
            } else {
            await axios.post(`${BACKEND_URL}/tasks`, { 
                title, 
                description,
                completed: false // New tasks are not completed by default
            });
            }
            onSave();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <h3 className="form-title">{task ? 'Edit Task' : 'Create New Task'}</h3>
        
        <div className="input-container">
          <div className={`form-group ${isFocused.title ? 'focused' : ''} ${title ? 'has-value' : ''}`}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsFocused({...isFocused, title: true})}
              onBlur={() => setIsFocused({...isFocused, title: false})}
              required
            />
            <div className="underline"></div>
          </div>
        </div>
        
        <div className="input-container">
          <div className={`form-group ${isFocused.description ? 'focused' : ''} ${description ? 'has-value' : ''}`}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setIsFocused({...isFocused, description: true})}
              onBlur={() => setIsFocused({...isFocused, description: false})}
              required
            />
            <div className="underline"></div>
          </div>
        </div>
        
        <div className="input-container">
            <div className="form-group">
                <label htmlFor="completed" className="checkbox-label">
                <input
                    id="completed"
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    disabled={!task} // Only allow changing completion status when editing
                />
                <span className="checkmark"></span>
                Completed
                </label>
            </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            <span>{task ? 'Update Task' : 'Create Task'}</span>
            <div className="fill-container"></div>
          </button>
          
          {task && (
            <button type="button" onClick={() => onSave()} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;