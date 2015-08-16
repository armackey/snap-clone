angular.module('app',
    [
    'ui.router',
    'icecomm.controller',
    'icecomm.connect',
    'icecomm.local',
    'icecomm.peer',
    'icecomm.leave',
    'ngResource',
    'comment.service',
    'auth.factory',
    'auth.interceptor',
    'user.service',
    'auth.token'
  ])
  .config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl',
            controllerAs: 'loginCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl',
            controllerAs: 'homeCtrl'
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
       
        $urlRouterProvider.otherwise('/login');
        // part 2 of removing # from url
        $locationProvider.html5Mode(true);
        // part 1 is at top of index.html file -- <base href="/"> :)

  // adds our AuthIntercept service to every $http request
  // with every $http request, user must have token!
  $httpProvider.interceptors.push('AuthIntercept');
  });
