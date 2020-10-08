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


app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")



app.get("/", function(req, res){
	res.render("home")
})

app.get("/contest", function(req, res){
	User.find({}, function(err, users) {
		if (!err) {
			res.render("contest", {data:users})
		}
	})
	// request.get("https://leetcode.com/contest/api/ranking/weekly-contest-209/?pagination=5&region=global",function (err, httpResponse, body) {
	// 	if (!err && httpResponse.statusCode == 200) {	
	// 		data = JSON.parse(body).total_rank
	// 		// console.log(data)
	// 		res.render("contest", {data:data})
	// 	}
	// })
})

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});