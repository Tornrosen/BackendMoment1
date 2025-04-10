/**
 * Expressapplikation
 * 
 * av Anna Danielsson
 */
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

//anslut till databas - anslutningsuppgifter
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

//själva anslutningen
connection.connect((err) => {
  if (err) {
    console.error("Connection failed: " + err);
    return;
  }
  console.log("Connected to MySQL!")
})

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//View engine: ejs
app.set("View engine", "ejs");

//Statiska filer
app.use(express.static("Public"));

//routing till de tre olika sidorna
app.get("/", (req, res) => {
  connection.query("SELECT * FROM courses ORDER BY id DESC;", (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.render("index.ejs", {
      rows: rows
    });
  })

})

app.get("/addcourse", (req, res) => {
  res.render("addcourse.ejs", {
    errors: [],
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
//fånga upp fel
  if (newCourseName === "") {
    errors.push("Ange kursnamn.");
  }
  if (newCourseCode === "") {
    errors.push("Ange en kurskod.");
  }
  if (newProgression === "") {
    errors.push("Ange progression.");
  }
  if (newSyllabus === "") {
    errors.push("Ange länk till kursplan.");
  }
//skapa sqlfråga om inga fel upptäcks, mata in data i tabell på säkrare sätt
  if (errors.length === 0) {
    connection.query("INSERT INTO courses (coursename, coursecode, progression, syllabus) VALUES (?, ?, ?, ?)",
      [newCourseName, newCourseCode, newProgression, newSyllabus], (err, res) => {
        if (err) throw err;
        console.log("Table updated!");
      });
    newCourseName = "";
    newCourseCode = "";
    newProgression = "";
    newSyllabus = "";

    res.redirect("/");
  }
  else {
    res.render("addcourse.ejs", {
      errors: errors,
      newCourseCode: newCourseCode,
      newCourseName: newCourseName,
      newProgression: newProgression,
      newSyllabus: newSyllabus
    });
  }
});

//radera formulärdata

app.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  connection.query("DELETE FROM courses WHERE id=?;", id, (err) => {
    if (err) {
      console.error(err.message)
    }
    res.redirect("/");
  })
});

//starta
app.listen(port, () => {
  console.log("Example app listening on port: " + port);
})
