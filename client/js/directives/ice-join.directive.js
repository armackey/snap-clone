angular.module('icecomm.join', [])
  .directive('icecommJoin', icecommJoinDirective);

 function icecommJoinDirective($http, userService, $stateParams) {
    
 return {
      restrict: 'E',
      require: '^icecomm',
      replace: true,
      scope: false,

      template: 
      '<a ui-sref ="user({id:user._id})" ng-click="join(user.id)"> {{user.username}} </a>',
      link: function($scope, ele, atts, comm) {

        $scope.join = function(user) {
          console.log('clicked!');
          // $http.get('/roomnumber', function (data) {
          //   console.log(data);
          //   // $scope.data = room;
          // });

          var connectOptions = createConnectOptions();
          console.log(atts.room);
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
