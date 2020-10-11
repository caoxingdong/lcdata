let express = require("express")
let app = express()
let bodyParser = require("body-parser")
let request = require("request")

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb+srv://doudle:doudle@lcdata.h41ou.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then()
.catch(error => console.log(error.message))

let User = require("./models/user")
let Utils = require("./utils")

let contestInfo = Utils.getContestInfo()
let questionInfo = Utils.getQuestionInfo()


app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")



app.get("/", function(req, res){
	res.render("home")
})

// app.get("/contest", function(req, res){
// 	User.find({}, function(err, users) {
// 		if (!err) {
// 			res.render("contest", {users:users})
// 		}
// 	})
// })

app.post("/contest", function(req, res){
	queryName = req.body.queryName
	res.redirect("/contest/" + queryName)
	// User.find({name:req.body.queryName}, function(err, users) {
	// 	if (!err && users.length > 0) {
	// 		// console.log(contestInfo)
	// 		// users[0].contestPerformance.forEach(function(contest) {
	// 		// 	console.log(contest.contestId)
	// 		// 	console.log(contest.contestId.toString())
	// 		// 	console.log(contestInfo[contest.contestId.toString()])
	// 		// })
			
	// 		res.render("contest", {user:users[0], contestInfo:contestInfo, questionInfo:questionInfo})
	// 	}
	// })
})

app.get("/contest/:queryName", function(req, res) {
	queryName = req.params.queryName
	User.find({name:queryName}, function(err, users) {
		if (!err && users.length > 0) {
			res.render("contest", {user:users[0], contestInfo:contestInfo, questionInfo:questionInfo})
		}
		else {
			res.send("no user")
		}
	})
})

app.get("/manage", function(req, res) {
	res.render("manage")
})

app.post("/manage", function(req, res) {
	console.log(req.body.type, req.body.number)
	res.render("manage")
})

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});