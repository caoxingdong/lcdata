let request = require("request")

let User = require("./models/user")

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb+srv://doudle:doudle@lcdata.h41ou.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => writeDataSingle(190))
.catch(error => console.log(error.message))

// writeDataSingle(190)
// User.deleteMany()
function writeDataSingle(i) {
	if (i === 200) {
		return
	}
	console.log(i)
	request.get("https://leetcode.com/contest/api/ranking/weekly-contest-" + i + "/?pagination=1&region=global",  function(error, response, body) {
		let data = JSON.parse(body).total_rank
		let cnt = 0
		data.forEach(function(user) {
			User.find({name:user.username}, function(err, users) {
				if (users.length === 0) {
					User.create({name:user.username, country: user.country_name,
							   ranks:[{contest:user.contest_id, rank:user.rank}]}, function() {
						console.log("create a new one")
						cnt += 1
						if (cnt == data.length) {
							writeDataSingle(i+1)
						}
					})
				}
				else {
					console.log("duplicate")
					User.findOneAndUpdate({name:user.username},{$push:{ranks:{contest:user.contest_id, rank:user.rank}}}).exec(function(){
						console.log("append a new one")
						cnt += 1
						if (cnt == data.length) {
							writeDataSingle(i+1)
						}
					})
				}
			})
		})
	})
}






