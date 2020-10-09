let request = require("request")

let User = require("./models/user")

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb+srv://doudle:doudle@lcdata.h41ou.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => writeDataSingle(190, 1))
.catch(error => console.log(error.message))

function writeDataSingle(i, j) {
	if (i === 200) {
		return
	}
	if (j === 21) {
		writeDataSingle(i+1, 1)
		return
	}
	console.log(i, j)
	request.get("https://leetcode.com/contest/api/ranking/weekly-contest-" + i + "/?pagination= " + j + "&region=global",  function(error, response, body) {
		let ranks = JSON.parse(body).total_rank
		let submissions = JSON.parse(body).submissions
		let cnt = 0
		if (ranks.length === 0) {
			writeDataSingle(i+1, 1)
			return
		}
		let qs = []
		JSON.parse(body).questions.forEach(function(q) {
			qs.push(q.question_id)
		})
		for (let k=0; k<ranks.length; k++) {
			let user = ranks[k]
			let sbs = []
			Object.keys(submissions[k]).forEach(function(s){
				 // console.log(submissions[k][s].question_id)
				 sbs.push(submissions[k][s].question_id)
			})
			let ps = []
			qs.forEach(function(q) {
				ps.push({problemId:q, solved:sbs.includes(q)})
			})
			User.find({name:user.username}, function(err, users) {
				if (users.length === 0) {
					let newuser = {name:user.username, country: user.country_name, contestPerformance:[{contestId:user.contest_id, rank:user.rank, problems:ps}]}
					// console.log(newuser.contestPerformance[0].problems)
					User.create(newuser, function(err, newUser) {
						// console.log("create a new one")
						// console.log(newUser)
						cnt += 1
						if (cnt == ranks.length) {
							writeDataSingle(i, j+1)
						}
					})
				}
				else {
					// console.log("duplicate")
					User.findOneAndUpdate({name:user.username},{$push:{contestPerformance:{contestId:user.contest_id, rank:user.rank, problems:ps}}}).exec(function(){
						// console.log("append a new one")
						cnt += 1
						if (cnt == ranks.length) {
							writeDataSingle(i, j+1)
						}
					})
				}
			})
		}			
	})
}







