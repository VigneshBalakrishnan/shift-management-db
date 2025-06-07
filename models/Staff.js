const mongoose = require('mongoose')
const staffSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    department:{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    phone: String,
    gender:String,
    address: String,
  }, { collection: 'staffs' });
  
  module.exports = mongoose.model('staff', staffSchema);
  