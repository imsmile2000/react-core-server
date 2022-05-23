const express = require("express"); 
const cors = require('cors');

const app = express();

const mysql = require("mysql"); 
const PORT = process.env.port || 8080; 
const bodyParser = require("body-parser");

let corsOptions = { 
    origin: "*",
    credential: true, 
};
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

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
    
    const sqlQuery = 
    "INSERT INTO BOARD (TITLE, CONTENT, MEMBER_NAME) VALUES (?,?,yoon);"; 
    db.query(sqlQuery, [title, content], (err, result) => { 
        res.send(result); 
    }); 
}); 

app.post("/update", (req, res) => { 
    var title = req.body.title; 
    var content = req.body.content; 
    
    const sqlQuery = 
    "UPDATE BOARD SET (TITLE = ?, CONTENT = ?,UPDATER_MEMBER_NAME) FROM (?,?,yoon);"; 
    db.query(sqlQuery, [title, content], (err, result) => { 
        res.send(result); 
    }); 
});


