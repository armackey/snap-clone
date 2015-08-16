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
        $locationProvider.html5Mode(true);
        // $httpProvider.interceptors.push(['$q', '$state', '$localStorage', function ($q, $state, $localStorage) {
        //    return {
        //        'request': function (config) {
        //            config.headers = config.headers || {};
        //            if ($localStorage.token) {
        //                config.headers.Authorization = $localStorage.token;
        //            }
        //            return config;
        //        },
        //        'responseError': function (response) {
        //            if (response.status === 401 || response.status === 403) {
        //                $state.go('login');
        //            }
        //            return $q.reject(response);
        //        }
        //    };
        // }]);

  // var interceptor = ['$q', '$injector', function($q, $injector) {
  //     function success(response) {
  //         return response;
  //     }

  //     function error(response) {

  //         if (response.status === 401) {
  //             $injector.get('$state').transitionTo('login');
  //             return $q.reject(response);
  //         } else {
  //             return $q.reject(response);
  //         }
  //     }

  //     return function(promise) {
  //         return promise.then(success, error);
  //     };
  // }];

  $httpProvider.interceptors.push('AuthIntercept');
 // $httpProvider.interceptors.push('AuthIntercept');
  });
