angular.module('app',
    [
    'ui.router',
    'icecomm.controller',
    'icecomm.connect',
    'icecomm.local',
    'icecomm.peer',
    'icecomm.leave',
    'auth0', 
    'angular-storage',
    'angular-jwt'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'partials/about.html',
            controller: 'actionCtrl',
            controllerAs: 'actionCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl',
            controllerAs: 'loginCtrl'
        });
        
        $urlRouterProvider.otherwise('/home');

});

