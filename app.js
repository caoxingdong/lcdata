let express = require("express")
let app = express()
let bodyParser = require("body-parser")
let request = require("request")
let chart = require("chart.js")
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
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.render("home")
})

app.post("/contest", function(req, res){
	queryName = req.body.queryName
	queryName.replace(/(^\s*)|(\s*$)/g, "")
	formerName = req.body.formerName
	formerName.replace(/(^\s*)|(\s*$)/g, "")
	// console.log(queryName)
	if (queryName.length == 0) {
		queryName = "ddoudle"
	}
	if (formerName.length == 0) {
		res.redirect("/contest/" + queryName)
	}
	else {		
		res.redirect("/contest/" + queryName + "&" + formerName)
	}
	
})

app.get("/contest/:names", function(req, res) {
	names = req.params.names
	if (!names.includes("&")) {
		User.find({name:names}, function(err, users) {
			if (!err && users.length > 0) {
				res.render("contest", {user:users[0], former: [], contestInfo:contestInfo, questionInfo:questionInfo})
			}
			else {
				res.send("no user")
			}
		})		
	}
	else {
		names = names.split('&')
		queryName = names[0]
		formerName = names[1]
		// console.log(queryName, formerName)
		User.find({name:queryName}, function(err, users) {
			if (!err && users.length > 0) {
				User.find({name:formerName}, function(err1, users1) {
					// console.log(users, users1)
					if (!err1 && users1.length > 0) {
						// console.log(users[0].contestPerformance.length, users1[0].contestPerformance.length)
						res.render("contest", {user:users[0], former: users1[0].contestPerformance, contestInfo:contestInfo, questionInfo:questionInfo})
					}
					else {
						res.render("contest", {user:users[0], former: [], contestInfo:contestInfo, questionInfo:questionInfo})
					}
				})
				// res.render("contest", {user:users[0], former: [], contestInfo:contestInfo, questionInfo:questionInfo})
			}
			else {
				res.send("no user")
			}
		})
	}
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