//Inställningar för databas

const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "localhost",
    user: "courses",
    password: "password",
    database: "courses"
});

//Inställningar för att ansluta till databas

connection.connect((err) =>{
    if(err){
        console.error("Connection failed: " + err);
        return;
    }
    console.log("Connected to MySQL!")
})

//SQL-frågor

connection.query("DROP TABLE IF EXISTS courses;", (err, results) => {
    if(err) throw err;
    console.log("Table deleted!") 
})

connection.query(`CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coursename VARCHAR(100),
    coursecode VARCHAR(100),
    progression VARCHAR(10),
    syllabus VARCHAR(100),
    created DATETIME DEFAULT CURRENT_TIMESTAMP)`,(err, results) =>{
    if(err) throw err;
    console.log("Table created!")
}
)

connection.query("INSERT INTO courses (coursename, coursecode, progression, syllabus) VALUES (?, ?, ?, ?)", 
    [newCourseName, newCourseCode, newProgression, newSyllabus], (err, results) =>{
        if(err) throw err;
        console.log("Table updated!")
    }
    )