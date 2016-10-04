var ENDPOINT = "js/portfolioinfo.json";
   var app = angular.module('portfolioApp', ['ngRoute']); 
   
        app.config(function($routeProvider, $locationProvider){
        $routeProvider

            .when('/', {
                templateUrl : 'templates/new.html',
                controller  : 'indexController'
            })

            .when('/works/:workId', {
                templateUrl : 'templates/modals.html',
                controller  : 'GalleryCtrl'
            })

            //.otherwise({redirectTo: "/"});
            $locationProvider.html5Mode(true);
            
      });

  app.controller('indexController',function($scope,$http){
      $http.get(ENDPOINT).then(function(res){
      $scope.works = res.data;
     });
  });

  app.controller('GalleryCtrl', function ($scope, $http, $routeParams) {
      $scope.work_id = $routeParams.workId;
      $scope.work;
      $http.get(ENDPOINT).then(function(res){
      $scope.work = findWork(res.data,$scope.work_id);
      });
});

  app.directive('headerNav', function() {
  return {
    restrict: 'AE',
    templateUrl: 'templates/headernav.html'
  }
});

var findWork = function(array,id){
  for(var i = 0; i < array.length; ++i) {   //, m = null
    if(array[i].id == id) {
      return array[i];
    };
  };
};