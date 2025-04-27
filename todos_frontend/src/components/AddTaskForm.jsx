import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './AddTaskForm.css';

export default function AddTaskForm({ groupId, onAddTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(groupId, taskTitle, dueDate);
    setTaskTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter new task"
        className="task-input"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="due-date-input"
      />
      <button type="submit" className="add-btn">
        <FaPlus /> Add Task
      </button>
    </form>
  );
}
