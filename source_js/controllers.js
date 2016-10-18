

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

    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
            event.stopPropagation();
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
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
    $scope.selection;
    $scope.comp=rank;
    $scope.order = true;//true if descending
    $scope.movies;
    var f = getQuery();

    $( "#query" ).keydown(function() {
        event.stopPropagation();
        getQuery();
    });

    $('select').change(function() {
        var s=this.value;
        if(s.localeCompare("Release")==0) {
            $scope.comp = release;
        }
        else if(s.localeCompare("Title")==0) {
            $scope.comp = title;
        }
        else{
            $scope.comp=rank;
        }
        getQuery();
    });

    $('#order input').on('click', function() {
        if(this.value.localeCompare('down')==0){
            $scope.order=true;
            getQuery();
        }
        else{
            $scope.order=false;
            getQuery();
        }
    });
    function getQuery(){
        $http({
            method : "GET",
            url : "data/imdb250.json"
        }).then(function mySucces(response) {
            if($scope.order==true)
                $scope.movies=response.data.filter(select).sort($scope.comp);
            else
                $scope.movies=response.data.filter(select).sort($scope.comp).reverse();
        }, function myError(response) {
            $scope.movies = response;
        });
    }
    function title(a, b) {
        return a.title.toString().localeCompare(b.title.toString());
    }


    function release(a, b) {
        sa=a.released.toString();
        sb=b.released.toString();
        return sb.substring(7,11).localeCompare(sa.substring(7,11));
    }
    function rank(a, b) {
        return a.rank-b.rank;
    }





}]);