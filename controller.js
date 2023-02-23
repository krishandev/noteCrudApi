const Note=require('./Note');

//Create a new note in database
function createNote(req, res){

    if(!req.body.content){
       return res.status(400).json({message:"Invalid Data"})
    }

    //create a note

    const note=new Note({
        title:req.body.title || "Untitled Note",
        content:req.body.content
    })

    //save to db

    note.save().then(function(data){
        res.json(data);
    }).catch(function(err){
        console.error("Error while saving:", err);
        res.status(500).json({message: err.message || "Some error occured while creating note"})
    })
}

//Retrieve and fetch all notes from the database
function findAllNotes(req, res){
 Note.find().then(function(data){
    res.json(data);
 }).catch(function(err){
    console.error("Error while fetching all notes:", err);
    res.status(500).json({message:err.message || "Some error occured while fetching all notes"})
 })
}

//fetch one note
function findNote(req, res){
    Note.findById(req.params.id).then(function(data){

        if(!data){
          return  res.status(404).json({message:"Note not found with this id :"+req.params.id})
        }
        res.json(data);
    }).catch(function(err){
        console.error("Error while finding note by id:", err);
        res.status(500).json({
            message:err.message || "Some error occured while fetching note"
        })
    })
}
//delete note by id
function deleteNote(req, res){
Note.findByIdAndDelete(req.params.id).then(function(data){
    if(!data){
     return   res.status(404).json({message:"Note not found with id :"+req.params.id})
    }
    res.json({message:"Note sucessfully delete with id: "+req.params.id})
}).catch(function(err){
   return res.status(500).json({message:err.message || "not able to delete"})
})
}

//update note by id
function updateNote(req, res){
    const filter={'title':req.body.title};
    const newData={
        'title':req.body.title,
        'content':req.body.content
    }

    Note.findOneAndUpdate(filter, newData, {upsert:true}).then(function(data){
        return res.json(newData);
    }).catch(function(err){
        console.error("Error while updating Note");
        res.status(500).json({message:err.message || "Some error occured while updating note"})
    })
}

module.exports={
    createNote,
    findAllNotes,
    findNote,
    deleteNote,
    updateNote
}
