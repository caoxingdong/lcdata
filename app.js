let express = require("express")
let app = express()
let bodyParser = require("body-parser")
let request = require("request")

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

app.get("/", function(req, res){
	request.get("https://leetcode.com/contest/api/ranking/weekly-contest-209/?pagination=1&region=global",function (err, httpResponse, body) {
		if (!err && httpResponse.statusCode == 200) {	
			data = JSON.parse(body).total_rank
			console.log(data)
			res.render("home", {data:data})
		}
	})
	// res.render("home")
})
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});