const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Staff = require('./models/Staff')
const Admin = require('./models/Admin')
const Role = require('./models/Role');
const Department = require('./models/Department');
const Shift = require('./models/Shift');
const Attendance = require('./models/Attendance');
const app = express();
app.use(bodyParser.json());
const lodash = require('lodash')
const FAILED = 'FAILED'
const SUCCESS = 'SUCCESS'
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200', // replace with your frontend domain
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
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
    const loginData = await Admin.find({ username, password }).exec();;
    if (loginData) {
      res.send({ status: SUCCESS, records: loginData[0] })
    } else {
      res.send({ status: FAILED, message: 'username password invalid' });
    }

  } catch (error) {
    console.log(error);

    res.status(401).json({ message: 'error' })
  }
})

app.post('/attendance', async (req, res) => {
  try {
    const { saveData } = req.body
    const user = await Attendance.create(saveData);
    res.status(200).json(user);
  } catch (error) {
    if (error['code'] === 11000) {
      res.status(400).json({ status: FAILED, error: "alreadyExits", keyValue: error['keyValue'] });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
})


app.post('/attendanceEntry', async (req, res) => {
  try {
    const { saveData } = req.body
    const saveResponse = await Attendance.create(saveData);

    res.status(200).json({ status: SUCCESS, records: saveResponse });
  } catch (error) {
    if (error['code'] === 11000) {
      res.status(400).json({ status: FAILED, error: "alreadyExits", keyValue: error['keyValue'] });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
})


app.post('/shiftCreation', async (req, res) => {
  try {
    const { saveData } = req.body
    const saveResponse = await Shift.create(saveData);

    res.status(200).json({ status: SUCCESS, records: saveResponse });
  } catch (error) {
    if (error['code'] === 11000) {
      res.status(400).json({ status: FAILED, error: "alreadyExits", keyValue: error['keyValue'] });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
})

app.post('/staffCreation', async (req, res) => {
  try {
    const { saveData } = req.body
    const saveResponse = await Staff.create(saveData);
    res.status(200).json({ status: SUCCESS, records: saveResponse });
  } catch (error) {
    if (error['code'] === 11000) {
      res.status(400).json({ status: FAILED, error: "alreadyExits", keyValue: error['keyValue'] });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
})

app.get('/staffList', async (req, res) => {
  try {
    const { filter } = req.query
    const staffList = await Staff.find().populate('role').populate('department').exec();
    res.status(200).json({status:SUCCESS,records:staffList});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

app.get('/shiftList', async (req, res) => {
  try {
    const { filter } = req.query
    const shiftList = await Shift.find().exec();

    const shiftListJSON = JSON.parse(JSON.stringify(shiftList))
    const staff = shiftListJSON.map(el => el['staff']);
    const uniqStaff = lodash.uniq(lodash.flatten(staff))
    // const obj_ids = uniqStaff.map(function(id) { return ObjectId(id); });
    const staffList = await Staff.find({ _id: { $in: uniqStaff } });
    const staffListJSON = JSON.parse(JSON.stringify(staffList))
    console.log(staffListJSON)
    shiftListJSON.forEach(eachShift => {
      eachShift['staffData'] = []
      eachShift['staff'].forEach(eachStaff => {
      const data = staffListJSON.find(e=> e['_id'] === eachStaff) 
        eachShift['staffData'].push(data)
      })
    })
    res.status(200).json({status:SUCCESS,records:shiftListJSON});
  } catch {
    res.status(400).json({ error: 'Error' });
  }
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');

})