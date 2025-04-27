const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['Not Completed', 'In Progress', 'Completed', 'Failed', 'Abandoned'],
    default: 'Not Completed',
  },
  dueDate: { type: Date, required: true },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
