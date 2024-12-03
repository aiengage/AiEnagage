// models/Prompt.js
const mongoose = require('mongoose');
const promptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    trim:true
  },
}, {
  timestamps: true,
});

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
