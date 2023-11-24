const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const path = require('path');
const app = express();
const port = 5000;

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('MySql Connected...');
    }
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

