var myApp = angular.module('myApp',
  ['ngRoute', 'firebase']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/board', {
      templateUrl: 'views/board.html',
      controller: 'BoardController'
    }).
    otherwise({
      redirectTo: '/board'
    });
}]);
