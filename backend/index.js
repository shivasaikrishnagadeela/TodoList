const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./Models/Task');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://clawpirates:5ECrYlc82C4HFVOl@todolist.4afmw18.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Route to get all todosx
app.get('/get', async (req, res) => {
  try {
    const todos = await Task.find({});
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// app.post('/todos', async (req, res) => {
//   try {
//     const { todo } = req.body;
//     const task = new Task({ todo });
//     await task.save();
//     res.status(201).json(task);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

app.post('/todos', async (req, res) => {
    try {
      const { todo } = req.body;
      if (typeof todo === 'string' && todo.trim() !== '') {
        const task = new Task({ todo });
        await task.save();
        res.status(201).json(task);
      }
     else {
        res.status(400).json({ message: 'Todo field must be a non-empty string' });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  


app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = 3334;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
