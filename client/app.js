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
  .config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider, $locationProvider,
  jwtInterceptorProvider) {

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl',
            data: { 
              requiresLogin: true 
            }
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

        authProvider.init({
            domain: 'youknow.auth0.com',
            clientID: 'lbxpZ2zoAxk1xmpt13O2ZDTHlogYgJjp',
            loginState: 'login'
          });

        jwtInterceptorProvider.tokenGetter = function(store) {
          return store.get('token');
        };

    $httpProvider.interceptors.push('jwtInterceptor');
        }).run(function($rootScope, auth, store, jwtHelper, $location) {
          $rootScope.$on('$locationChangeStart', function() {
            if (!auth.isAuthenticated) {
              var token = store.get('token');
              if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                  auth.authenticate(store.get('profile'), token);
                } else {
                  $location.path('/login');
                }
              }
            }

          });
}).controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$routeChangeSuccess', function(e, nextRoute){
    if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample' ;
    }
  });
});

