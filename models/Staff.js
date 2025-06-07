const mongoose = require('mongoose')
const staffSchema = new mongoose.Schema({
    name: {type:String, unique : true, required : true},
    email: {type:String, unique : true, required : true},
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
    department:{ type: mongoose.Schema.Types.ObjectId, ref: 'department' },
    gender:String,
    address: String,
  }, { collection: 'staff' });
  
  module.exports = mongoose.model('staff', staffSchema);
  