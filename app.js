let express = require("express")
let app = express()
let bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get("/", function(req, res){
	res.render("home")
})
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});