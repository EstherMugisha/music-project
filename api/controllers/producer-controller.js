const mongoose =require("mongoose");
const Song=mongoose.model("Song");

function addProducer(req,res){
    const songId = req.params.songId; 
    Song.findById(songId).exec(function(err,song){
        if(err){
            console.log(err);
            res.status(500).json({"message":"No such Id"});
            return;
        }else if(!song){
            console.log(err);
            res.status(404).json({"message":"song id not found"});
            return;
        }else{
            song.producer.name=req.body.name;
            song.producer.year=req.body.year;
            song.producer.country=req.body.country;
            song.producer.founder=req.body.founder;
            
            song.save(function(err,updatedSong){
                if(err){
                    res.status(500).json(err);
                    return;
                }
                else{
                    res.status(201).json(updatedSong.producer)
                }
            })
        }
    }) 
}

function getProducer(req,res){
    const songId=req.params.songId;
    Song.findById(songId).select("producer").exec(function(err,song){
        if(err){
            console.log("error getting producer");
            res.status(500).json(err);
            return;
        }
        else{
            console.log("Got producer");
            res.status(200).json(song.producer)
        }
    })

}

function updateProducer(req,res){
    const songId = req.params.songId;
    Song.findById(songId).exec(function(err,song){
        if(err){
            console.log("error getting producer");
            res.status(500).json(err);
            return;
        }else if(!song){
        res.status(404).json({"message": "Song Id not found"});
        }
        else{
            song.producer.name=req.body.name;
            song.producer.year=req.body.year;
            song.producer.country=req.body.country;
            song.producer.founder=req.body.founder;
            
            song.save(function(err,updatedSong){
                if(err){
                    res.status(500).json(err);
                    return;
                }
                else{
                    res.status(201).json(updatedSong.producer)
                }
            })
        
        }}
    )
}

function deleteProducer(req,res){
    const songId = req.params.songId;
    Song.findById(songId).exec(function(err,song){
        if(err){
            console.log("error getting producer");
            res.status(500).json(err);
            return;
        }else if(!song){
        res.status(404).json({"message": "Song Id not found"});
        }
        else{
        song.producer.remove();
        song.save(function(err,deletedProducer){
            if(err){
                console.log("Error finding producer");
                res.status(500).json(err);
            }
            res.status(204).json(deletedProducer)
        })
        }
    })
}

module.exports={
    addProducer:addProducer,
    getProducer:getProducer,
    updateProducer:updateProducer,
    deleteProducer:deleteProducer
}