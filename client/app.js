angular.module('app',
    [
    'ui.router',
    'icecomm.controller',
    'icecomm.connect',
    'icecomm.local',
    'icecomm.peer',
    'icecomm.leave',
    'user.factory'
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
        })
        .state('users', {
            url: '/users',
            templateUrl: 'partials/users.html',
            controller: 'userCtrl',
            controllerAs: 'userCtrl'
        });

        $urlRouterProvider.otherwise('/home');
  });
