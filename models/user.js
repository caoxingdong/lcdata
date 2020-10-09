let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: String,
    country: String,
    data_region:String,
    contestPerformance: [{
        contestId: Number,
        rank: Number,
		problems: [{
			 problemId: Number,
			 solved: Boolean
		}]
    }]
});

module.exports = mongoose.model("User", userSchema);
