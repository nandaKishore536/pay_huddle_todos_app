import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import './TaskItem.css';

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.name);
  const [editedStatus, setEditedStatus] = useState(task.status);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleSave = () => {
    onUpdate(editedTitle, editedStatus, editedDueDate);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${isEditing ? 'editing' : ''}`}>
      <div className="task-title">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          disabled={!isEditing}
          className={isEditing ? "task-title-input" : "task-title-label"}
        />
      </div>

      <div className="task-status">
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
      </div>

      <div className="task-due-date">
        {isEditing ? (
          <input
            type="date"
            value={editedDueDate.slice(0, 10)}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="task-due-date-input"
          />
        ) : (
          task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>

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
