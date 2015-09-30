angular.module('icecomm.connect', [])
  .directive('icecommConnect', icecommConnectDirective);

  function icecommConnectDirective($http) {
    return {
      restrict: 'E',
      require: '^icecomm',
      replace: true,
      scope: true,
      template: '<button ng-click="broadcast()">{{text}}</div>',
      link: function($scope, ele, atts, comm) {
        $scope.text = atts.text || "broadcast";
        $scope.broadcast = function() {
          var broadcast = {};
          broadcast.room = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (var i = 0; i < 5; i+=1 ) {
            broadcast.room += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          // var jsonRoom = JSON.stringify(room);
          console.log(broadcast);
          $http.put('/broadcasting', broadcast, function () {

          });
          var connectOptions = createConnectOptions();
          comm.connect(broadcast.room, connectOptions);
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
