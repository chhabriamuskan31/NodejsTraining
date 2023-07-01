const express = require('express') //It will search express in node modules in library.
const app = express() //listen the port and create a file for us. It works as a middleware (between express and main code. restriction is there.)

const port = 8001

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})