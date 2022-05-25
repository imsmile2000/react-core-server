const express = require("express"); 
const app = express();
const mysql = require("mysql"); 
const PORT = process.env.port || 8080 ; 

const cors = require('cors');
const bodyParser = require("body-parser");

let corsOptions = { 
    origin: "*",
    credential: true, 
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json()); 

const db = mysql.createPool({
    host: "localhost",
    user: "root", 
    password: "dgu1234!", 
    database: "core", }); 
    
app.get("/", (req, res) => { 
    const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)"; 
    db.query(sqlQuery, (err, result) => {
        console.log(err)
        res.send("success!"); 
    }); 
});

app.listen(PORT, () => { 
    console.log(`running on port ${PORT}`); 
});

app.get("/list", (req, res) => { 
    const sqlQuery = "SELECT BOARD_ID, TITLE, MEMBER_NAME, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM BOARD;";
    db.query(sqlQuery, (err, result) => { 
        res.send(result); 
    }); 
});

app.post("/insert", (req, res) => { 
    var title = req.body.title; 
    var content = req.body.content; 
    var member_name=req.body.member_name;
    var random_password=req.body.random_password;
    const sqlQuery = 
    "INSERT INTO BOARD (TITLE, CONTENT, MEMBER_NAME, RANDOM_PASSWORD) VALUES (?,?,?,?)"; 
    db.query(sqlQuery, [title, content,member_name,random_password], (err, result) => {
        if(err) return console.log(err);
        if(result) res.send(result); 
    }); 
}); 

app.post("/update", (req, res) => { 
    var title = req.body.title; 
    var content = req.body.content; 
    var member_name=req.body.member_name;
    var random_password=req.body.random_password;
    const sqlQuery = 
    "UPDATE BOARD SET (TITLE = ?, CONTENT = ?,MEMBER_NAME=?,RANDOM_PASSWORD) FROM (?,?,?,?);"; 
    db.query(sqlQuery, [title, content,member_name,random_password], (err, result) => { 
        if(err) return console.log(err);
        if(result) res.send(result);
    }); 
});

app.post("/delete", (req, res) => { 
    const id = req.body.boardIdList; // 6,5
    const sqlQuery = `DELETE FROM BOARD WHERE BOARD_ID IN (${id})`;
    db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});


