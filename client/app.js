angular.module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'partials/about.html'
        });

});
