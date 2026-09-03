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
app.get('/api/tblProfile', (_res,res)=>{
    pool.query('SELECT * FROM tblProfile', (err,_rows,_fields)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: "Failed to fetch profiles" });
        }
        res.json(_rows);
    });
});

//search
app.get('/api/tblProfile/:id',(_res,res)=>{
    const id = _res.params.id;
    pool.query(
        "SELECT * FROM tblProfile WHERE id = ?", [id], (err, _rows, _fields) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Failed to fetch profile" });
            }
            if (_rows.length > 0) {
                res.json(_rows);
            } else {
                res.status(400).json({ msg: `${id} id not found!`})
            }
        },
    );
});

//create
app.post('/api/tblProfile',(_res,res)=>{
    const name=_res.body.name;
    const email=_res.body.email;
    const role=_res.body.role;

    pool.query(
        "INSERT INTO tblProfile (name, email, role) VALUES (?,?,?)", [name, email, role], (err, _rows, _fields) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Insert failed" });
            }
            res.json({ msg: `Data Inserted Successfully` });
        },
    );
});

//update
app.put("/api/tblProfile", (_res, res) => {
    const name = _res.body.name;
    const email = _res.body.email;
    const role = _res.body.role;
    const id = _res.body.id;

    pool.query(
        "UPDATE tblProfile SET name = ?, email = ?, role = ? WHERE id = ?",
        [name, email, role, id],
        (err, _rows, _fields) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Update failed" });
            }
            if (_rows.affectedRows === 0) {
                return res.status(404).json({ msg: "Profile not found" });
            }
            res.json ({msg: `Data Updated Successfully`});
        },
    );
});

//delete
app.delete("/api/tblProfile/", (_res, res) => {
    const id = _res.body.id;
    pool.query(
        "DELETE FROM tblProfile WHERE id = ?", [id], (err, _rows, _fields) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Delete failed" });
            }
            if (_rows.affectedRows === 0) {
                return res.status(404).json({ msg: "Profile not found" });
            }
            res.json({ msg: `Data Deleted Successfully` });
        },
    );
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
