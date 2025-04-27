import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import './TaskItem.css';

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.name);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleSave = () => {
    onUpdate(editedTitle, editedStatus);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${isEditing ? 'editing' : ''}`}>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        disabled={!isEditing}
        className={isEditing ? "task-title-input" : "task-title-label"}
      />

      <select
        value={editedStatus}
        onChange={(e) => setEditedStatus(e.target.value)}
        disabled={!isEditing}
        className="task-status-select"
      >
        <option>Completed</option>
        <option>Not Completed</option>
        <option>In Progress</option>
        <option>Failed</option>
        <option>Abandoned</option>
      </select>

      {/* ✅ Due Date Display */}
      {task.dueDate && (
        <div className="task-due-date">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? <FaSave /> : <FaEdit />}
        </button>
        <button className="delete-btn" onClick={onDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
