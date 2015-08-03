(function() {
angular.module('app', [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
    })
    .state('about', {
      url: '/about',
      templateUrl: 'partials/documentation.html',
      requireLogin: false
    });

    $urlRouterProvider.otherwise('/');
});
})();