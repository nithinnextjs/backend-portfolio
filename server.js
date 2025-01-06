const express = require('express');
const mongoose = require('mongoose');
const Profiles = require('./model')
const app = express();

app.use(express.json())

mongoose.connect('mongodb+srv://nithingudala22:NithinProfile2024@cluster0.fdhsg3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    () => console.log('DB Connected...')
).catch(err => console.log(err));

app.post('/profiles',async (req, res) => {
    const {fristname,lastname,companyname,contacttype,reasonforcontact,Email,Phonenumber} = req.body;
    try{
      const newData = new Profiles({fristname,lastname,companyname,contacttype,reasonforcontact,Email,Phonenumber});
      await newData.save();
      return res.json(await Profiles.find())
    }catch(err){
        console.log(req.body);
        console.log(err.message);
      return err;
    }
})

app.get('/getprofiles',async (req,res) => {
    try{
      const allprofiles = await Profiles.find();
      return res.json(allprofiles);
    }
    catch(error){
        console.log(err.message)
    }
})

app.put('/updateprofiles/:id',async (req, res) => {
    const {fristname,lastname,companyname,contacttype,reasonforcontact,Email,Phonenumber} = req.body;
    try{
      const newData = new Profiles({fristname,lastname,companyname,contacttype,reasonforcontact,Email,Phonenumber});
      await newData.save();
      await Profiles.findByIdAndUpdate(req.params.id)
      return res.json(await await Profiles.find());
    }catch(err){
        console.log(req.body);
        console.log(err.message);
      return err;
    }
})

app.get('/getprofiles/:id',async (req,res) => {
    try{
      const selectedProfile = await Profiles.findById(req.params.id);
      return res.json(selectedProfile);
    }
    catch(error){
        console.log(err.message)
    }
})

app.delete('/deleteprofiles/:id',async (req,res) => {
    try{
      await Profiles.findByIdAndDelete(req.params.id);
      return res.json(await await Profiles.find());
    }
    catch(error){
        console.log(err.message)
    }
})

app.listen(3000,()=>console.log('server running...'))