const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Group = require('../models/group');

// ADD Task to a Group
router.post('/:groupId', async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const { name, dueDate } = req.body;

    const newTask = new Task({
      name,
      dueDate,
      groupId
    });

    const savedTask = await newTask.save();

    // Push task to group's tasks array
    await Group.findByIdAndUpdate(groupId, {
      $push: { tasks: savedTask._id }
    });

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
});



// PUT - Update a task by ID
router.put('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
});


// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    // Find the task to get its groupId
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const groupId = task.groupId;

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    // Remove the task reference from the group's tasks array
    await Group.findByIdAndUpdate(groupId, {
      $pull: { tasks: taskId }
    });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task', error });
  }
});




module.exports = router;
