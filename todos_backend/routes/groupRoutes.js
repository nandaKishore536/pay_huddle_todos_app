const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const Task = require('../models/task');


// Create group
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    // Check if group with the same name already exists
    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      return res.status(400).json({ message: 'Group name already exists' });
    }

    const newGroup = new Group({ name });
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET all groups
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('tasks');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE Group  name
router.put('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    group.name = req.body.name;
    await group.save();
    res.json(group);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE group
router.delete('/:id', async (req, res) => {
  try {
    const groupId = req.params.id;

    // Delete all tasks belonging to this group
    await Task.deleteMany({ groupId });

    // Delete the group
    await Group.findByIdAndDelete(groupId);

    res.status(200).json({ message: 'Group and its tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting group and tasks', error });
  }
});


module.exports = router;
