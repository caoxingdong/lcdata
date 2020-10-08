let request = require("request")
let requestSync = require('sync-request');
for (let i=0; i<10; i++) {
	console.log(i)
	res = requestSync("GET", "https://www.google.com/")
	console.log(res.getBody())
		// console.log(err1)
		// if (!err1 && httpResponse.statusCode == 200) {
		// 	console.log("success")
		// }
}