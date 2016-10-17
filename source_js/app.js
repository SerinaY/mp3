
var imdb = angular.module('imdb',['ngRoute']);

imdb.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'partials/list.html',
            controller: 'myController'
        })
        .when('/gallery', {
            templateUrl : 'partials/gallery.html',
            controller: 'galleryCtrl'
        })
        .when('/details/:orderId', {
            templateUrl: 'partials/details.html',
            controller: 'detailsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});