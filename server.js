const express=require('express');
const bodyParser=require('body-parser');
const controller=require('./controller');
const app=express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}))

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/notes',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4,
}).then(function(){
    console.log("Sucessfully Connected to the Database");
}).catch(function(err){
    console.log("Could not connect to the DB. Exiting Now...", err);
    process.exit();
})

app.get('/', function(req, res){
    res.send("Hello World");
})

//create note
app.post('/create', function(req, res){
    controller.createNote(req, res);
})

//get all notes
app.get('/notes', function(req, res){
    controller.findAllNotes(req, res)
})

//get note by id
app.get('/note/:id', function(req, res){
    controller.findNote(req, res)
})

//update note 
app.put('/update', function(req, res){
    controller.updateNote(req, res)
})

//delete note by id
app.delete('/delete/:id', function(req, res){
    controller.deleteNote(req, res)
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})