const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/posts',(req,res)=> {
    const GET_QUERY = `SELECT * FROM G_52_DB.posts;`;
    connection.query(GET_QUERY, (err, response)=> {
        if (err) console.log(err)
        else res.send(response)
    })
})

app.post('/addposts',(req,res)=> {
    const ADD_QUERY = `INSERT INTO G_52_DB.posts (postname, postcost, postlink, postdesc) VALUES ('${req.body.name}', '${req.body.cost}', '${req.body.link}', '${req.body.desc}');`;
    connection.query(ADD_QUERY, (err)=> {
        if (err) console.log(err)
        else res.send('post has been made')
    })
})

app.delete('/deleteposts/:postid',(req,res)=> {
    const DELETE_QUERY = `DELETE FROM G_52_DB.posts WHERE (postid = ${req.params.postid});`;
    connection.query(DELETE_QUERY, (err, res)=> {
        if (err) console.log(err)
    })
})

app.put('/editposts/:intId',(req,res)=> {
    const EDIT_QUERY = `UPDATE G_52_DB.posts SET postname = '${req.body.name}', postcost = '${req.body.cost}', postlink = '${req.body.link}', postdesc = '${req.body.desc}' WHERE (postid = '${req.params.intId}');`;
    connection.query(EDIT_QUERY, (err, res)=> {
        if (err) console.log(err)
    })
})

app.listen(8080, ()=> {
    console.log('running on port 8080')
})