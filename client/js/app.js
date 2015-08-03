angular.module('app', ['ui-router'])
  .config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'partials/about.html'
          
        });
    
      $urlRouterProvider.otherwise('/home');    
});