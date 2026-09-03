const express=require('express');
//const moment=require('moment');
const app=express();
const cors=require('cors');
const mysql=require('mysql2');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

const PORT=process.env.PORT || 5000;

const pool=mysql.createPool({
    
    //==local
    // host:'localhost',
    // user:'root',
    // password:'',
    // database:'employee',
    //=====
    host:'sql.freedb.tech',
    user:'u_nhwDYf',
    password:'GZLSm0gFZBHd',
    database:'freedb_Q1QiUrDr',
    //=====
    // connectionLimit: 10,
    // waitForConnections: true,
    // queueLimit: 0,

})

//report
app.get('/api/books', (_res,res)=>{
    pool.query('SELECT * FROM books', (err,_rows,_fields)=>{
        if (err) throw err;
        res.json(_rows);
    });
});

//search
app.get('/api/books/:id',(_res,res)=>{
    const id = _res.params.id;
    pool.query(
        "SELECT * FROM books WHERE id = ?", [id], (err, _rows, _fields) => {
            if (err) throw err;
            if (_rows.length > 0) {
                res.json(_rows);
            } else {
                res.status(400).json({ msg: `${id} id not found!`})
            }
        },
    );
});

//create
app.post('/api/books',(_res,res)=>{
    const title=_res.body.title;
    const author=_res.body.author;
    const year=_res.body.year;

    pool.query(
        "INSERT INTO books (title, author, year) VALUES (?,?,?)", [title, author, year], (err, _rows, _fields) => {
            if (err) throw err;
            res.json({ msg: `Data Inserted Successfully` });
        },
    );
});

//update
app.put("/api/books", (_res, res) => {
    const title = _res.body.title;
    const author = _res.body.author;
    const year = _res.body.year;
    const id = _res.body.id;

    pool.query(
        "UPDATE books SET title = ?, author = ?, year = ?,  = ? WHERE id=?",
        [title, author, year, id],
        (err, _rows, _fields) => {
            if (err) throw err;
            res.json ({msg: `Data Updated Successfully`});
        },
    );
});

//delete
app.delete("/api/books/", (_res, res) => {
    const id = _res.body.id;
    pool.query(
        "DELETE FROM books WHERE id = ?", [id], (err, _rows, _fields) => {
            if (err) throw err;
            res.json({ msg: `Data Deleted Successfully` });
        },
    );
});

//POST
app.post('/api/books',(_res,res)=>{
    const title=_res.body.title;
    const author=_res.body.author;
    const year=_res.body.year;

    connection.execute(`INSERT INTO books(title, author, year) VALUES (?,?,?)`, [title, author, year ], (err,_rows, _fields) => {
        if (err) throw err 
            res.json({ msg: `Data Inserted Successfully` });
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})