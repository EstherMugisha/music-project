angular.module("music").controller("SongController", SongController);

function SongController($routeParams, SongsFactory){
    const vm=this;
    const id=$routeParams.id;
    SongsFactory.SongsGetOne(id).then(function(response){
        vm.song=response;
        console.log(response);
    })

    SongsFactory.getProducer(id).then(function(response){
        vm.producer = response;
        console.log(response);
    })

}