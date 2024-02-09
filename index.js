// index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

const uri = "mongodb+srv://username:quinncoin123@cluster0.gdtunpp.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

connect();

const Newspaper = mongoose.model('Newspaper', new mongoose.Schema({
  title: String,
  url: String,
  date: { type: Date, default: Date.now },
  description: String
}));

app.use(express.json()); // Body parser middleware

app.get('/newspapers', async (req, res) => {
  try {
    const newspapers = await Newspaper.find();
    res.status(200).json(newspapers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching newspapers' });
  }
});

app.post('/newspapers', async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const newNewspaper = new Newspaper({ title, url, description });
    const savedNewspaper = await newNewspaper.save();
    res.status(201).json(savedNewspaper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding a new newspaper' });
  }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000, () => {
  console.log("server started on port 8000");
});
