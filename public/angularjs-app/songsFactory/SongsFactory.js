angular.module("music").factory("SongsFactory", SongsFactory)

function SongsFactory($http){
    return {
        songsGetAll:getAll,
        SongsGetOne:getOne,
        getProducer:getProducer
    }

    function getAll(){
        return $http.get("/api/songs").then(complete).catch(failed)
    }

    function getOne(id){
        return $http.get("/api/songs/"+id).then(complete).catch(failed)
    }

    function getProducer(id){
        return $http.get("/api/songs/"+id+"/producer").then(complete).catch(failed)
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        return error
    }
}