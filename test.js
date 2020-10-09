let syncRequest = require("sync-request")
let fs = require('fs');

let contestInfo = {}

for (let i = 50; i<210; i++) {
	let url = "https://leetcode.com/contest/api/info/weekly-contest-" + i
	let r = syncRequest('GET', url)
	let data = JSON.parse(r.getBody())
	if (Object.keys(data).length === 1) {
		continue
	}
	else {
		contestInfo[data.contest.id] = {
			title: data.contest.title,
			slug: data.contest.title_slug
		}
	}
}

for (let i = 1; i<60; i++) {
	let url = "https://leetcode.com/contest/api/info/leetcode-weekly-contest-" + i
	let r = syncRequest('GET', url)
	let data = JSON.parse(r.getBody())
	if (Object.keys(data).length === 1) {
		continue
	}
	else {
		contestInfo[data.contest.id] = {
			title: data.contest.title,
			slug: data.contest.title_slug
		}
	}
}

for (let i = 1; i<37; i++) {
	let url = "https://leetcode.com/contest/api/info/biweekly-contest-" + i
	let r = syncRequest('GET', url)
	let data = JSON.parse(r.getBody())
	if (Object.keys(data).length === 1) {
		continue
	}
	else {
		contestInfo[data.contest.id] = {
			title: data.contest.title,
			slug: data.contest.title_slug
		}
	}
}
contestInfo[1] = {title:"Warm Up Contest", slug:"warm-up-contest"}
console.log(Object.keys(contestInfo).length)
fs.writeFile("contest.text", JSON.stringify(contestInfo), function() {
	console.log(1)
})