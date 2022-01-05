const e = require("express");
const mongoose = require("mongoose")
const Song=mongoose.model("Song");

function songsGetAll(req,res){
    var offset=0; 
    var count=5;
    const maxCount=10;

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count, 10);
    }

    if(isNaN(offset)||isNaN(count)){
        res.status(400).json({"message": "QueryString offset and count must be numbers"});
        return;
    }

    if(count>maxCount){
        res.status(400).json({"message": "cannot exceed count of "+maxCount});
        return;
    }

    Song.find().skip(offset).limit(count).exec(function(err,songs){
        if(err){
            console.log("error fetching songs");
            res.status(500).json(err);
            return;
        }
        else{
            console.log("Found Songs", songs.length)
            res.status(200).json(songs)
        }
    })
}

function songsGetOne(req,res){
    const songId=req.params.songId;
    Song.findById(songId).exec(function(err,song){
        if(err){
            console.log("error finding the song");
            res.status(500).json({"message":"No such Id"});
            return;
        }
        else if(!song){
            console.log("can't find song with given id");
            res.status(404).json({"message":"No song with given id"})
            return;
        }

        else{
            console.log("Found song");
            res.status(200).json(song)
        }
    })
}

function songsAddOne(req,res){
   Song.create({title:req.body.title, artists:req.body.artists, year: req.body.year}, function(err,song){
       if(err){
           console.log("Error creating the song");
           res.status(400).json({"message":"Error creating the song"})
           return;
       }else{
           console.log("song created", song);
           res.status(200).json(song);
       }
   })
}

function songsDeleteOne(req,res){
    const songId=req.params.songId;
    Song.findByIdAndRemove(songId).exec(function(err,deletedSong){
        if(err){
            console.log("error finding song");
            res.status(500).json({"message":"No such Id"});
            return;
        }
        else if(!deletedSong){
        console.log("song wih id "+songId+" does not exist");
        res.status(400).json({"message":"song with provided id does not exist"});
        return;
        }
        else{
            res.status(204).json({"message":"song is deleted"})
        }
    })
   
}

function songsUpdateOne(req,res){
    const songId=req.params.songId;
    Song.findById(songId).exec(function(err, song){
        if(err){
            console.log("error finding song");
            res.status(500).json({"message":"No such Id"});
            return;
        }
        else if(!song){
        console.log("song wih id "+songId+" does not exist");
        res.status(400).json({"message":"song with provided id does not exist"});
        return;
        }
        else{
            song.title=req.body.title;
            song.artists=req.body.artists;
            song.year=parseInt(req.body.year);
            song.save(function(err,updatedSong){
                if(err){
                    console.log("error updating song");
                    res.status(500).json(err);
                    return;
                }
                console.log("song saved");
                res.status(204).json(updatedSong)
            })
        }
    })
    
}

module.exports ={
    songsGetAll:songsGetAll,
    songsGetOne:songsGetOne,
    songsAddOne:songsAddOne,
    songsDeleteOne:songsDeleteOne,
    songsUpdateOne:songsUpdateOne

}