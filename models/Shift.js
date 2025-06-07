const mongoose = require('mongoose')
const shiftSchema = new mongoose.Schema({
    type: {type:String, required : true},
    staff: {type:Array, required : true},
    date: Number,
  }, { collection: 'shift' });
  
  module.exports = mongoose.model('shift', shiftSchema);
  