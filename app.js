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
})

app.post("/contest", function(req, res){
	User.find({name:req.body.queryName}, function(err, users) {
		if (!err && users) {
			res.render("contest", {data:users})
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