angular.module('icecomm.join', [])
  .directive('icecommJoin', icecommJoinDirective);

  function icecommJoinDirective(userService) {
    
    
    return {
      restrict: 'E',
      require: '^icecomm',
      replace: true,
      scope: true,
      template: 
      '<div ng-repeat="user in users">' + 
      '<a ui-sref ="user({id:user._id})"> {{user.username}}</a></div>',
      link: function($scope, ele, atts, comm, $http) {
        $scope.users = userService.query();
        console.log($scope.users);
        // $scope.text = atts.text || "join";
        $scope.user = function() {
          var connectOptions = createConnectOptions();
          console.log(comm);
          comm.connect(atts.room, connectOptions);
        };
        function createConnectOptions() {
          var connectOptions = {};
          if (atts.video === 'false') {
            connectOptions.video = false;
          }
          if (atts.audio === 'false') {
            connectOptions.audio = false;
          }
          if (!atts.stream === 'false') {
            connectOptions.stream = false;
          }
          if (!atts.limit) {
            connectOptions.limit = atts.limit;
          }
          return connectOptions;
        }
      }
    };
  }
