angular
    .module('auth.token', [])
    .factory('AuthToken', ['$window',
        function($window) {
            var self = this;

            // gets token 
            self.getToken = function() {
                return $window.localStorage.getItem('token');
            };

            // adds and removes token on login/signup
            self.setToken = function(token) {
                if (token) {
                    $window.localStorage.setItem('token', token);
                    console.log('hi');
                } else {
                    $window.localStorage.removeItem('token');
                    console.log('bye');
                }
            };

            return self;
        }
    ]);