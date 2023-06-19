const express = require('express');
const mongoose = require('mongoose');
const List = require('./list');

const app = express();
app.use(express.json());

mongoose.connect(
    "mongodb+srv://booknook:Vishal1111@cluster0.xnxlmeg.mongodb.net/booknook?retryWrites=true&w=majority"
).then((res) => console.log("Connected"));


app.post('/todo', async (req, res) => {
    try {
        const { title, description } = req.body;
        const list = await List.create({ title, description, completed: false });
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a todo' });
    }
});


app.get('/todo', async (req, res) => {
    try {
      const lists = await List.find();
      res.json(lists);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch lists' });
    }
  });
  

app.get('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const list = await List.findById(id);
        if (!list) {
            return res.status(404).json({ error: 'list not found' });
        }
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the list' });
    }
});

app.put('/todo/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;
      const list = await List.findByIdAndUpdate(id, { title, description, completed }, { new: true });
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the list' });
    }
  });
  

app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await List.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the list' });
    }
});

app.listen(4500, () => {
    console.log('Server is running on port 4500');
});
