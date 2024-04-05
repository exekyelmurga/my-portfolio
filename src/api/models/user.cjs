const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  }
});

// export default userSchema
module.exports = mongoose.model('User', userSchema);