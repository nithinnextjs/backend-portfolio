const express = require('express');
const mongoose = require('mongoose');
const Profiles = require('./model'); // Assuming your model file is named 'model.js'
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb+srv://nithingudala22:NithinProfile2024@cluster0.fdhsg3l.mongodb.net/profiles?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB Connected to profiles database...'))
  .catch(err => console.log('MongoDB connection error:', err));

// POST endpoint to add new profile
app.post('/profiles', async (req, res) => {
  const { fristname, lastname, companyname, contacttype, reasonforcontact, Email, Phonenumber } = req.body;
  try {
    const newData = new Profiles({ fristname, lastname, companyname, contacttype, reasonforcontact, Email, Phonenumber });
    await newData.save();
    const allProfiles = await Profiles.find();
    return res.json(allProfiles); // Return updated profiles list
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Error saving profile', details: err.message });
  }
});

// GET endpoint to fetch all profiles
app.get('/getprofiles', async (req, res) => {
  try {
    const allProfiles = await Profiles.find();
    return res.json(allProfiles);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Error fetching profiles', details: err.message });
  }
});

// PUT endpoint to update profile by ID
app.put('/updateprofiles/:id', async (req, res) => {
  const { fristname, lastname, companyname, contacttype, reasonforcontact, Email, Phonenumber } = req.body;
  try {
    // Update the profile by ID
    const updatedProfile = await Profiles.findByIdAndUpdate(
      req.params.id,
      { fristname, lastname, companyname, contacttype, reasonforcontact, Email, Phonenumber },
      { new: true } // Return updated document
    );
    return res.json(updatedProfile); // Return the updated profile
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Error updating profile', details: err.message });
  }
});

// GET endpoint to fetch profile by ID
app.get('/getprofiles/:id', async (req, res) => {
  try {
    const selectedProfile = await Profiles.findById(req.params.id);
    if (!selectedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    return res.json(selectedProfile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Error fetching profile by ID', details: err.message });
  }
});

// DELETE endpoint to delete profile by ID
app.delete('/deleteprofiles/:id', async (req, res) => {
  try {
    const deletedProfile = await Profiles.findByIdAndDelete(req.params.id);
    if (!deletedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    const remainingProfiles = await Profiles.find();
    return res.json(remainingProfiles); // Return remaining profiles after deletion
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Error deleting profile', details: err.message });
  }
});

// Start the server
const PORT = 5000; // You can replace with process.env.PORT if needed
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
