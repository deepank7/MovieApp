var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search")
})

app.get("/results", (req, res) => {
    const searchTerm = req.query.search;
    request(`http://www.omdbapi.com/?s=${searchTerm}&apikey=thewdb`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.render("results", { data: data });
        }
    })
})


app.listen(3000, () => {
    console.log("Server running on port 3000")
});