angular.module('app',
    [
    'ui.router',
    'icecomm.controller',
    'icecomm.connect',
    'icecomm.local',
    'icecomm.peer',
    'icecomm.leave',
    'ngResource',
    'user.service',
    'comment.service'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl',
            controllerAs: 'homeCtrl'
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
        })
        .state('user', {
            url:'/users/:id',
            templateUrl: 'partials/single-user.html',
        });

        $urlRouterProvider.otherwise('/home');
  });
