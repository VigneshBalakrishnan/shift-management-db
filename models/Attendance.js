const mongoose = require('mongoose')
const attendanceSchema = new mongoose.Schema({
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    date: Number,
    isPresent: Boolean,
  }, { collection: 'attendance' });
  
  module.exports = mongoose.model('attendance', attendanceSchema);
  