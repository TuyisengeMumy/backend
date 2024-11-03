const express =require('express');
const mysql= require('mysql2');
const cors= require('cors');
const bodyParser= require('body-parser');
const app=express();
app.use(cors());
app.use(bodyParser.json());
//connect to db
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mern'

});
db.connect((err)=>{
if(err){
    console.error('Error to connect to MYSQL',err);
    return;

}
console.log('connected to mysql');

// testing route
});


app.get('/',async(req,res)=>{
    return res.json("express is running")
  
})


// app.post('/users',async(req,res)=>{
//     const {name,email,age}=req.body;
//     db.query('INSERT INTO users(name,email,age)values(?,?,?)',
//         [name,email,age],
//     (err,results)=>{
//         if(err)return res.status(500).json({error:err.message});
//         res.status(201).json({id:results.insertedId,name,email,age});
//     })

// })
// app.put('/users/:id',async(req,res)=>{
//     const {id}=req.params;
//     const{name,email,age}=req.body;
//     db.query('UPDATE users SET name =?, email =?,age =? WHERE id =?',)
//   [name,email,age,id],
//   (err,results)=>{
//     if(err)return res.status(500).json({error:err.message});
//     res.status(201).json({message: 'Student updated successfully'});
//   }  
// })

// app.get('/users',(req,res)=>{
//     db.query('SELECT * FROM users',(err,result)=>{
//         if(err){
//             return res.status(201).json({message:err.message})
//         }
//         return res.json(result);
//     })
// })

// CREATE - Add a new user
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  db.query(
    'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
    [name, email, age],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, name, email, age });
    }
  );
});

// READ - Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/users/:id',(req,res)=>{
    const { id }= req.params;
    db.query('SELECT * FROM users WHERE id = ?',[id],(err,results)=>{
        if(err) return res.status(500).json({error:err.message});
        if(results.length === 0) return res.status(404).json({error:'user not found'});
        res.json(results[0]);
    })
})

// UPDATE - Update a user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  db.query('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
    [name, email, age, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User updated successfully' });
    }
  );
});

// DELETE - Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted successfully' });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
