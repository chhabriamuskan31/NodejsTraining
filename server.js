const express = require('express') //It will search express in node modules in library.
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userModel = require("./model/userSchema");

const app = express() //listen the port and create a file for us. It works as a middleware (between express and main code. restriction is there.)
const port = 8001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Connect of Mongodb database.
const mongoUrl = 'mongodb://muskan31:muskan@ac-54myka8-shard-00-00.tvmp3iv.mongodb.net:27017,ac-54myka8-shard-00-01.tvmp3iv.mongodb.net:27017,ac-54myka8-shard-00-02.tvmp3iv.mongodb.net:27017/?ssl=true&replicaSet=atlas-f43pzw-shard-0&authSource=admin&retryWrites=true&w=majority';
/*
mongoose.connect(mongoUrl)
  .then(()=> console.log('Connected!'))
  .catch((error)=>{
    console.log(error);
  })

*/

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

mongoose.connect(mongoUrl
,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// const userModel = require("./model/userSchema");

/*
async- await
promise
callback
*/

/* API to add new user in MongoDB */
app.post("/add_user", async (request, response) => {

  let insertData = {"name" : request.body.name,
"age" : request.body.age};
  const user = new userModel(insertData);
  console.log("app hit");
  try {
     await user.save(); // save data inside users table 
    response.send(user); //sending user json as response to client
  } catch (error) {
    response.status(500).send(error);
  }
});
/* API to get all user from MongoDB */
app.get("/users",  (request, response) => {
  userModel.find({}).then((list)=>{
    response.send(list);
  }).catch((err)=>{
    response.status(500).send(err);
  })
});
/* API to get particular user in MongoDB */
app.get('/user/:userId',function(req,res){
  userModel.find({"_id":req.params.userId}).then((list)=>{
      res.send(list);
  }).catch((err)=>{
      res.send(err);
  })
})
/* API to Update particular user Details in MongoDB */
app.put('/updateUser/:id', (req, res) => {
  console.log("Id to update:::::", req.params.id)
  const taskToUpdate = req.body;
  userModel.findOneAndUpdate({"_id":req.params.id},taskToUpdate)
  .then((user)=>{
      res.send("User Updated Successfully");
  }).catch((err)=>{
      res.send(err);
  })
})
/* API to Hard delete particular user Details in MongoDB */
app.delete('/deleteUser/:userId',function(req,res){
  userModel.deleteOne({"_id":req.params.userId})
 .then((user)=>{
     res.send(user);
 }).catch((err)=>{
     res.send(err);
 })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
