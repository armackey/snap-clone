angular
  .module('auth.interceptor', [])
    .factory('AuthIntercept', ['AuthToken', '$q', '$injector', 
      function (AuthToken, $q, $injector) {
      
      
      var self = this;

      self.request =  function (config) {
        var token = AuthToken.getToken();
        // if token exists add it to the header
        if (token) {

          config.headers['x-access-token'] = token;
          
        }
          return config;
      };

      // if response is 403 or 401 boot them off site
      self.responseError = function (response) {
        if (response.status === 403 || response.status === 401) {
          // we inject state because we're using ui-router
          // we can't do it the "normal" way or else we get the circular dependency error
          $injector.get('$state').transitionTo('login');
          AuthToken.setToken();
          return $q.reject(response);
        }
          $q.reject(response);
  };
          return self;


}]);