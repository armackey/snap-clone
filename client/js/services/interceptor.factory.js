angular
  .module('auth.interceptor', [])
    .factory('AuthIntercept', ['AuthToken', '$q', '$injector', 
      function (AuthToken, $q, $injector) {
      
      var self = this;

  // var self = ['$q', '$injector', function($q, $injector) {
  //     function success(response) {
  //         return response;
  //     }

  //     function error(response) {

  //         if(response.status === 401) {
  //             $injector.get('$state').transitionTo('login');
  //             return $q.reject(response);
  //         }
  //         else {
  //             return $q.reject(response);
  //         }
  //     }

  //     return function(promise) {
  //         return promise.then(success, error);
  //     };
  // }];

      self.request =  function (config) {
        var token = AuthToken.getToken();
        console.log(token);
        // if token exists add it to the header
        if (token) {
          config.headers['x-access-token'] = token;
        }
          return config;
      };

      // if response is 403 boot them off site
      // they don't have a token
      self.responseError = function (response) {
        if (response.status === 403 || response.status === 401) {
          $injector.get('$state').transitionTo('login');
          AuthToken.setToken();
          return $q.reject(response);
        }
        $q.reject(response);
  };
      return self;


}]);