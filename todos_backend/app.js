const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const groupRoutes = require('./routes/groupRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todosApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.log('MongoDB connection error:', err));


  app.use(cors());


// Routes
app.use('/api/groups', groupRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
