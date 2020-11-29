let request = require("request")

let User = require("./models/user")

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.connect('***', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => User.deleteMany())
.catch(error => console.log(error.message))
