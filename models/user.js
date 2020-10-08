let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
   name: String,
   country: String,
   ranks: [
      {
         contest: Number,
         rank: Number
      }
   ]
});

module.exports = mongoose.model("User", userSchema);
