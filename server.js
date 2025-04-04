/**
 * Expressapplikation
 */
const express = require("express")
const app = express()
const port = 3000

//View engine: ejs
app.set ("View engine", "ejs");

//Statiska filer
app.use(express.static("Public"));

//route
app.get("/", (req, res) => {
  const courseList =[];
  res.render("index.ejs", {courseList});
})

app.get("/addcourse", (req, res) =>{
  res.render("addcourse.ejs");
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

//start
app.listen(port, () =>{
  console.log("Example app listening on port: " +port);
})
