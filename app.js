let express = require("express")
let app = express()
let bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get("/", function(req, res){
	res.render("home")
})

app.listen(3000, function() {
	console.log("Services starts")
})