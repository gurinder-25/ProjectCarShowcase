const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/car', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Check for MongoDB connection success or failure
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a mongoose schema for your cars collection
const carSchema = new mongoose.Schema({
  name: String,
  image: String,
  start: String,
  topSpeed: String,
  engine: String,
});

// Create a mongoose model for the cars collection
const Car = mongoose.model('Car', carSchema);

// Express route to get car details by name
app.get('/api/cars/:carName', async (req, res) => {
  const carName = req.params.carName;

  try {
    const carDetails = await Car.findOne({ name: carName });
    res.json(carDetails);
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
