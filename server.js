const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Staff = require('./models/Staff')
const Admin = require('./models/Admin')
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pfm_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/welcome', (req, res) => {
  try {
    res.send('Welcome')
  } catch {

  }
})


app.get('/adminLogin', async (req, res) => {
  try {
    const { username, password } = req.query;
    const loginData = await Admin.find({ username, password });
    if (loginData) {
      res.send({ status: "SUCCESS", records: loginData[0] })
    } else {
      res.send({ status: "FAILED", message: 'username password invalid' });
    }

  } catch (error) {
    console.log(error);

    res.status(401).json({ message: 'error' })
  }
})

app.post('/createUser', async (req, res) => {
  try {
    const { userRec } = req.body
    const user = await Staff.create(userRec);
    res.status(200).json(user);
  } catch {
    res.status(400).json({ error: 'Error' });
  }
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');

})