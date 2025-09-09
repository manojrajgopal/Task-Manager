import React, { useState } from 'react';
import axios from 'axios';
import './CommentSection.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const CommentSection = ({ taskId, comments, onCommentUpdate }) => {
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/tasks/${taskId}/comments`, { 
        content: newComment 
      });
      setNewComment('');
      // Check if onCommentUpdate is provided before calling it
      if (onCommentUpdate && typeof onCommentUpdate === 'function') {
        onCommentUpdate();
      } else {
        // Fallback: reload the page if callback is not provided
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(`${BACKEND_URL}/tasks/${taskId}/comments/${commentId}`, { 
        content: editContent 
      });
      setEditingComment(null);
      if (onCommentUpdate && typeof onCommentUpdate === 'function') {
        onCommentUpdate();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${BACKEND_URL}/tasks/${taskId}/comments/${commentId}`);
      if (onCommentUpdate && typeof onCommentUpdate === 'function') {
        onCommentUpdate();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comments-container">
      <h4 className="comments-title">Comments</h4>
      
      <form onSubmit={handleAddComment} className="comment-form">
        <div className={`input-container ${isFocused ? 'focused' : ''} ${newComment ? 'has-value' : ''}`}>
          <input
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required
            className="comment-input"
          />
          <div className="input-underline"></div>
        </div>
        <button type="submit" className="btn-primary comment-submit">
          <span>Add Comment</span>
          <div className="fill-container"></div>
        </button>
      </form>
      
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div 
            key={comment.id} 
            className={`comment-card ${editingComment === comment.id ? 'editing' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {editingComment === comment.id ? (
              <div className="edit-comment-form">
                <div className="input-container focused has-value">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="comment-input"
                    autoFocus
                  />
                  <div className="input-underline"></div>
                </div>
                <div className="edit-actions">
                  <button 
                    onClick={() => handleUpdateComment(comment.id)} 
                    className="btn-primary save-edit-btn"
                  >
                    <span>Save</span>
                    <div className="fill-container"></div>
                  </button>
                  <button 
                    onClick={() => setEditingComment(null)} 
                    className="btn-secondary cancel-edit-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="comment-content">
                <p className="comment-text">{comment.content}</p>
                <div className="comment-footer">
                  <small className="comment-date">
                    {new Date(comment.created_at).toLocaleString()}
                  </small>
                  <div className="comment-actions">
                    <button 
                      onClick={() => {
                        setEditingComment(comment.id);
                        setEditContent(comment.content);
                      }} 
                      className="btn-icon edit-btn"
                      aria-label="Edit comment"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteComment(comment.id)} 
                      className="btn-icon delete-btn"
                      aria-label="Delete comment"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;