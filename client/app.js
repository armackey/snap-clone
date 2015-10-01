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
    'auth.interceptor',
    'icecomm.join'
  ])
  .config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl',
            controllerAs: 'loginCtrl'
        })
        .state('broadcasting', {
            url: '/broadcasting',
            templateUrl: 'partials/broadcasting.html',
            controller: 'broadcastCtrl',
            controllerAs: 'broadcastCtrl'
        })
        .state('live-users', {
            url: '/live-users',
            templateUrl: 'partials/live-users.html',
            controller: 'broadcastCtrl',
            controllerAs: 'broadcastCtrl'
        })
        .state('user', {
            url:'/users/:id',
            templateUrl: 'partials/single-user.html',
            controller: 'broadcastCtrl',
            controllerAs: 'broadcastCtrl'
        });
       
        $urlRouterProvider.otherwise('/login');
        // part 2 of removing # from url
        $locationProvider.html5Mode(true);
        // part 1 is at top of index.html file -- <base href="/"> :)

  // adds our AuthIntercept service to every $http request
  // with every $http request, user must have token!
  $httpProvider.interceptors.push('AuthIntercept');
  });