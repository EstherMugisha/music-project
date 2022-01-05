const express=require("express"); 
const router=express.Router(); 
const songsControllers=require("../controllers/songs-controllers.js");
const producerControllers=require("../controllers/producer-controller.js");

router.route("/songs")
.get(songsControllers.songsGetAll)
.post(songsControllers.songsAddOne)

router.route("/songs/:songId")
.get(songsControllers.songsGetOne)
.delete(songsControllers.songsDeleteOne)
.put(songsControllers.songsUpdateOne)

router.route("/songs/:songId/producer")
.post(producerControllers.addProducer)
.get(producerControllers.getProducer)
.put(producerControllers.updateProducer)
.delete(producerControllers.deleteProducer)

module.exports=router;