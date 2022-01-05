angular.module("music", ['ngRoute']).config(config);

function config($routeProvider){
$routeProvider.when("/",{
    templateUrl:"angularjs-app/home/home.html",
    controller:"SongsController",
    controllerAs:"vm",
})
.when("/songs", {
    templateUrl:"angularjs-app/songs/songs.html",
    controller:"SongsController",
    controllerAs:"vm",
}).when("/song/:id", {
    templateUrl:"angularjs-app/song/song.html",
    controller:"SongController",
    controllerAs:"vm",
})
.otherwise({
    redirectTo:'/'
})
}