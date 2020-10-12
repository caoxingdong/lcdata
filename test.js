let syncRequest = require("sync-request")
let fs = require('fs')
let Utils = require("./utils")

let oldContestInfo = Utils.getContestInfo()
// let newContestInfo = {}

Object.keys(oldContestInfo).forEach(key => {
	let url = "https://leetcode.com/contest/api/info/" + oldContestInfo[key].slug
	let r = syncRequest('GET', url)
	let data = JSON.parse(r.getBody())
	let t = data.contest.start_time
	// "https://leetcode.com/contest/api/ranking/weekly-contest-210/?pagination=1&region=global"
	url = "https://leetcode.com/contest/api/ranking/" + oldContestInfo[key].slug + "/?pagination=1&region=global"
	r = syncRequest('GET', url)
	data = JSON.parse(r.getBody())
	let userNumber = data.user_num
	
	oldContestInfo[key].time = t
	oldContestInfo[key].userNumber = userNumber
	
})

// console.log(oldContestInfo)

fs.writeFile("contest.text", JSON.stringify(oldContestInfo, null, 4), function() {
	console.log(1)
})



// let url = "https://leetcode.com/contest/api/info/weekly-contest-200"
// let r = syncRequest('GET', url)
// let data = JSON.parse(r.getBody())
// console.log(data.contest.title)
// console.log(data.contest.title_slug)
// console.log(data.contest.start_time)
// url = "https://leetcode.com/contest/api/ranking/weekly-contest-210/?pagination=1&region=global"
// r = syncRequest('GET', url)
// data = JSON.parse(r.getBody())
// console.log(data.user_num)

// let contestInfo = {}

// for (let i = 50; i<210; i++) {
// 	let url = "https://leetcode.com/contest/api/info/weekly-contest-" + i
// 	let r = syncRequest('GET', url)
// 	let data = JSON.parse(r.getBody())
// 	if (Object.keys(data).length === 1) {
// 		continue
// 	}
// 	else {
// 		contestInfo[data.contest.id] = {
// 			title: data.contest.title,
// 			slug: data.contest.title_slug
// 		}
// 	}
// }

// for (let i = 1; i<60; i++) {
// 	let url = "https://leetcode.com/contest/api/info/leetcode-weekly-contest-" + i
// 	let r = syncRequest('GET', url)
// 	let data = JSON.parse(r.getBody())
// 	if (Object.keys(data).length === 1) {
// 		continue
// 	}
// 	else {
// 		contestInfo[data.contest.id] = {
// 			title: data.contest.title,
// 			slug: data.contest.title_slug
// 		}
// 	}
// }

// for (let i = 1; i<37; i++) {
// 	let url = "https://leetcode.com/contest/api/info/biweekly-contest-" + i
// 	let r = syncRequest('GET', url)
// 	let data = JSON.parse(r.getBody())
// 	if (Object.keys(data).length === 1) {
// 		continue
// 	}
// 	else {
// 		contestInfo[data.contest.id] = {
// 			title: data.contest.title,
// 			slug: data.contest.title_slug
// 		}
// 	}
// }
// contestInfo[1] = {title:"Warm Up Contest", slug:"warm-up-contest"}
// console.log(Object.keys(contestInfo).length)
// fs.writeFile("contest.text", JSON.stringify(contestInfo), function() {
// 	console.log(1)
// })