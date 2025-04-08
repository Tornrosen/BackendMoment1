//Inställningar för databas

const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//Inställningar för att ansluta till databas

connection.connect((err) => {
    if (err) {
        console.error("Connection failed: " + err);
        return;
    }
    console.log("Connected to MySQL!")
})

//SQL-fråga för att radera och skapa tabell

connection.query("DROP TABLE IF EXISTS courses;", (err, results) => {
    if (err) throw err;
    console.log("Table deleted!")
})

connection.query(`CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coursename VARCHAR(100),
    coursecode VARCHAR(100),
    progression VARCHAR(10),
    syllabus VARCHAR(100),
    created DATETIME DEFAULT CURRENT_TIMESTAMP)`, (err, results) => {
    if (err) throw err;
    console.log("Table created!")
}
)

