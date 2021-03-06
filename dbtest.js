let request = require("request")

let User = require("./models/user")

let Utils = require("./utils")
let contestInfo = Utils.getContestInfo()

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.connect('***', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => writeDataSingle(414, 1))
.catch(error => console.log(error.message))

function writeDataSingle(contestId, pageNumber) {
	if (contestId === 429) {
		return
	}
	if (!(contestId.toString() in contestInfo)) {
		writeDataSingle(contestId+1, 1)
		return
	}
	// if (pageNumber === 21) {
	// 	writeDataSingle(contestId+1, 1)
	// 	return
	// }
	console.log(contestId, pageNumber)
	request.get("https://leetcode.com/contest/api/ranking/" + contestInfo[contestId.toString()].slug + "/?pagination= " + pageNumber + "&region=global",  function(error, response, body) {
		// let contestId = JSON.parse(body).
		let ranks = JSON.parse(body).total_rank
		let submissions = JSON.parse(body).submissions
		let cnt = 0
		if (ranks.length === 0) {
			writeDataSingle(contestId+1, 1)
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
					let newuser = {name:user.username, country: user.country_name,data_region:user.data_region, contestPerformance:[{contestId:contestId, rank:user.rank, problems:ps}]}
					// console.log(newuser.contestPerformance[0].problems)
					User.create(newuser, function(err, newUser) {
						// console.log("create a new one")
						// console.log(newUser)
						cnt += 1
						if (cnt == ranks.length) {
							writeDataSingle(contestId, pageNumber+1)
						}
					})
				}
				else {
					if (!(users[0].contestPerformance[users[0].contestPerformance.length-1].contestId == contestId)) {
						User.findOneAndUpdate({name:user.username},{$push:{contestPerformance:{contestId:contestId, rank:user.rank, problems:ps}}}).exec(function(){
						})
					}
					cnt += 1
					if (cnt == ranks.length) {
						writeDataSingle(contestId, pageNumber+1)
					}
				}
			})
		}			
	})
}



//428 done



