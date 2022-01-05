angular.module("music").controller("SongsController", SongsController);

function SongsController(SongsFactory){
const vm=this; 
vm.title="SONG LIST";
SongsFactory.songsGetAll().then(function(response){
    console.log(response);
    vm.songs=response;
})
}