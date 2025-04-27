import React, { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskItem from './TaskItem';
import { FaTrash, FaPlus, FaEdit, FaSave } from 'react-icons/fa';
import {
  fetchGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  addTask,
  updateTask,
  deleteTask
} from '../api';
import './GroupedTodosApp.css';

export default function GroupedTodosApp() {
  const [groups, setGroups] = useState([]);
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editedGroupTitles, setEditedGroupTitles] = useState({});

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const data = await fetchGroups();
      setGroups(data);
    } catch (err) {
      console.error('Error loading groups:', err);
      alert('Failed to load groups. Please try again.');
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupTitle.trim()) return;
    try {
      await createGroup(newGroupTitle);
      setNewGroupTitle('');
      loadGroups();
    } catch (error) {
      if (error.response?.status === 400) {
        alert(error.response.data.message || 'Group name already exists');
      } else {
        alert('Error creating group');
      }
    }
  };

  const handleUpdateGroup = async (groupId) => {
    try {
      const newTitle = editedGroupTitles[groupId];
      if (!newTitle || !newTitle.trim()) return;
      await updateGroup(groupId, newTitle);
      setEditingGroupId(null);
      loadGroups();
    } catch (error) {
      alert('Error updating group');
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId);
      loadGroups();
    } catch (error) {
      alert('Error deleting group');
    }
  };

  const handleAddTask = async (groupId, title) => {
    if (!title.trim()) return;
    try {
      const task = {
        name: title,
        dueDate: new Date().toISOString()
      };
      await addTask(groupId, task);
      loadGroups();
    } catch (error) {
      alert('Error adding task');
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await updateTask(taskId, updates);
      loadGroups();
    } catch (error) {
      alert('Error updating task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      loadGroups();
    } catch (error) {
      alert('Error deleting task');
    }
  };

  return (
    <div className="grouped-app">
      <h1 className="title">Todos App</h1>

      <div className="group-input">
        <input
          type="text"
          value={newGroupTitle}
          onChange={(e) => setNewGroupTitle(e.target.value)}
          placeholder="Enter new group title"
          className="group-title-input"
        />
        <button onClick={handleCreateGroup} className="add-btn">
          <FaPlus /> Add Group
        </button>
      </div>

      {groups.length === 0 ? (
        <p className="empty">No groups available</p>
      ) : (
        <div className="groups-grid">
          {groups.map(group => (
            <div key={group._id} className={`group-box ${editingGroupId === group._id ? 'editing' : ''}`}>
              <div className="group-header">
                {editingGroupId === group._id ? (
                  <input
  type="text"
  value={editedGroupTitles[group._id] !== undefined ? editedGroupTitles[group._id] : group.name} // ensure state is reflected
  onChange={(e) => {
    // Update the specific group's title in state only if it has changed
    setEditedGroupTitles((prevState) => ({
      ...prevState,
      [group._id]: e.target.value,  // Track changes in each group's title
    }));
  }}
  className="group-title-input"
/>

                ) : (
                  <div className="group-title-label">{group.name}</div>
                )}
                <div className="group-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      if (editingGroupId === group._id) {
                        handleUpdateGroup(group._id);
                      } else {
                        setEditedGroupTitles({ ...editedGroupTitles, [group._id]: group.name });
                        setEditingGroupId(group._id);
                      }
                    }}
                  >
                    {editingGroupId === group._id ? <FaSave /> : <FaEdit />}
                  </button>
                  <button onClick={() => handleDeleteGroup(group._id)} className="delete-btn">
                    <FaTrash />
                  </button>
                </div>
              </div>

              <AddTaskForm groupId={group._id} onAddTask={handleAddTask} />

              {group.tasks.length === 0 ? (
                <p className="empty">No tasks available</p>
              ) : (
                <div className="task-list">
                  {group.tasks.map(task => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onUpdate={(title, status) =>
                        handleUpdateTask(task._id, { name: title, status })
                      }
                      onDelete={() => handleDeleteTask(task._id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}