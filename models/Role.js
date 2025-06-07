const mongoose = require('mongoose')
const roleSchema = new mongoose.Schema({
    role: String,
    comments: String
  }, { collection: 'role' });
  
  module.exports = mongoose.model('role', roleSchema);