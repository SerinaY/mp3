

imdb.controller('galleryCtrl', ['$scope', '$http', function($scope, $http) {
    query();
    function query() {
        $http({
            method: "GET",
            url: "data/imdb250.json"
        }).then(function mySucces(response) {
            $scope.movies = response.data.filter(sel);
        }, function myError(response) {
            $scope.movies = response;
        });

    }
    $scope.value = "*";
    function sel(obj) {
        if($scope.value.localeCompare("*")!=0){
            for(i=0; i<obj['genre'].length; i++){
                if(obj['genre'][i].localeCompare($scope.value)==0)
                    return true;
            }
            return false;
        }

        return obj.hasOwnProperty("rank");
    }

    $('#g-filter').on( 'click', 'button', function() {
        $scope.value = $( this ).attr('data-filter');
        query();
    });



}]);
imdb.controller('detailsCtrl', ['$scope', '$routeParams','$http', function($scope, $routeParams, $http) {
    $scope.id=$routeParams.orderId;

    $http({
        method : "GET",
        url : "data/imdb250.json"
    }).then(function mySucces(response) {
        $scope.movies=response.data.filter(one);
    }, function myError(response) {
        $scope.movies = response;
    });
    function one(obj) {
        return obj.rank==$scope.id;
    }
}]);







imdb.controller('myController', ['$scope', '$http', function($scope, $http) {
    $scope.query = "G";
    $scope.selection;
    $scope.comp=choose("Rank");
    $scope.order = true;//true if descending
    $scope.movies;
    var f = getQuery($scope.comp,$scope.order);

    $( "#query" ).keydown(function() {
        event.stopPropagation();
        getQuery($scope.comp, $scope.order);
    });

    $('select').change(function() {
        getQuery(choose(this.value), $scope.order);
    });

    $('#order input').on('click', function() {
        if(this.value.localeCompare('down')==0){
            if($scope.order!=true){
                $scope.order=true;
                getQuery($scope.omp, $scope.order);
            }
        }
        else{
            if($scope.order=true){
                $scope.order=false;
                getQuery($scope.comp, $scope.order);
            }
        }
    });
    function getQuery(cp, order){
        $http({
            method : "GET",
            url : "data/imdb250.json"
        }).then(function mySucces(response) {
            if(order==true)
                $scope.movies=response.data.filter(select).sort(cp);
            else
                $scope.movies=response.data.filter(select).sort(cp).reverse();
        }, function myError(response) {
            $scope.movies = response;
        });
    }




}]);