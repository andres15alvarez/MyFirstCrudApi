const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '068856187030',
    database: 'nodeapi'
});

// Routes
app.get('/', (req,res) => {
    res.send('Welcome to my api');
});

// All customers
app.get('/costumers', (req,res) => {
    const sql = 'SELECT * FROM costumer';
    con.query(sql, (err,result) => {
        if(err){
            throw err;
        }
        if(result.length > 0){
            res.json(result);
        } else{
            res.send('Not result');
        }
    });
});

app.get('/costumers/:id', (req,res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM costumer WHERE id=${id}`;
    con.query(sql, (err,result) => {
        if(err){
            throw err;
        }
        if(result.length > 0){
            res.json(result);
        } else{
            res.send('Not result');
        }
    });
});

app.post('/add', (req,res) => {
    const sql = 'INSERT INTO costumer SET ?';
    const costumerObj = {
        id: req.body.id,
        name: req.body.name,
        city: req.body.city
    };
    con.query(sql, costumerObj, err => {
        if(err){
            throw err;
        }
        res.send('Customer created');
    });
});

app.put('/:id/edit', (req,res) => {
    const {id} = req.params;
    const {name, city} = req.body
    const sql = `UPDATE costumer SET name='${name}', city='${city}' WHERE id=${id}`;
    con.query(sql, err => {
        if(err){
            throw err;
        }
        res.send('Costumer edited');
    });
});

app.delete('/:id/delete', (req,res) => {
    const {id} = req.params;
    const sql = `DELETE FROM costumer WHERE id=${id}`;
    con.query(sql, (err,result) => {
        if(err){
            throw err;
        }
        res.send('Delete customer');
    });
});


// Check connection
con.connect(err => {
    if(err){
        throw err;
    }
    console.log('database running');
})

app.listen(PORT, () => console.log('Server running on port 3000'));