const mongoose = require('mongoose')
const departmentSchema = new mongoose.Schema({
    department: {type:String, unique : true, required : true},
    comments: String
  }, { collection: 'department' });
  
  module.exports = mongoose.model('department', departmentSchema);