/**
 * Expressapplikation
 * 
 * av Anna Danielsson
 */
const express = require("express");
const app = express();
const port = process.env.PORT||3000;
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

//skapa variabel för kurslista
const courseListEl =[{
  courseName: "",
  courseCode: "",
  progression: "",
  syllabus: "",
}];

//anslut till databas
const connection = mysql.createConnection({
  host : process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) =>{
  if(err){
      console.error("Connection failed: " + err);
      return;
  }
  console.log("Connected to MySQL!")
})

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//View engine: ejs
app.set ("View engine", "ejs");

//Statiska filer
app.use(express.static("Public"));

//route
app.get("/", (req, res) => {
  res.render("index.ejs", {courseListEl});
})

app.get("/addcourse", (req, res) =>{
  res.render("addcourse.ejs", {
    errors:[],
    newCourseCode: "",
    newCourseName: "",
    newProgression: "",
    newSyllabus: ""
  });
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

//posta formulärdata
app.post("/addcourse", (req, res) => {
  let newCourseName = req.body.courseName;
  let newCourseCode = req.body.courseCode;
  let newProgression = req.body.progression;
  let newSyllabus = req.body.syllabus;
  let errors = [];

  if(newCourseName==="") {
   errors.push("Ange kursnamn");
  }
  if(newCourseCode==="") {
    errors.push ("Ange en kurskod");
  }
  if(newProgression==="") {
    errors.push ("Ange progression");
  }
  if(newSyllabus==="") {
    errors.push ("Ange länk till kursplan");
  }
  
  if (errors.length===0) {
    connection.query("INSERT INTO courses (coursename, coursecode, progression, syllabus) VALUES (?, ?, ?, ?)", 
      [newCourseName, newCourseCode, newProgression, newSyllabus], (err, res) =>{
          if(err) throw err;
          console.log("Table updated!");
          /*courseListEl.push({
            courseName: newCourseName,
            courseCode: newCourseCode,
            progression: newProgression,
            syllabus: newSyllabus*/
      });
newCourseName="";
newCourseCode="";
newProgression="";
newSyllabus="";

res.redirect("/");
}
else {
  res.render("addcourse.ejs", {
    errors:errors,
    newCourseCode: newCourseCode,
    newCourseName: newCourseName,
    newProgression: newProgression,
    newSyllabus: newSyllabus
  });}
});

//starta
app.listen(port, () =>{
  console.log("Example app listening on port: " +port);
})
