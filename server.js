const express = require('express') //It will search express in node modules in library.
const app = express() //listen the port and create a file for us. It works as a middleware (between express and main code. restriction is there.)
const port = 8001

//Connect of Mongodb database.
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://muskan31:muskan31@ac-54myka8-shard-00-00.tvmp3iv.mongodb.net:27017,ac-54myka8-shard-00-01.tvmp3iv.mongodb.net:27017,ac-54myka8-shard-00-02.tvmp3iv.mongodb.net:27017/?ssl=true&replicaSet=atlas-f43pzw-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(mongoUrl)
  .then(()=> console.log('Connected!'))
  .catch((error)=>{
    console.log(error);
  })

/*
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/post',(req,res)=>{
    res.send('This is our post method')
})

app.delete('/delete',(req,res)=>{
    res.send('This is our delete method')
})

app.put('/put',(req,res)=>{
    res.send('This is our put method')
})
*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})