angular.module('icecomm.local', [])
  .directive('icecommLocal', icecommLocal);

  function icecommLocal($sce, $http) {
    return {
      restrict: 'E',
      replace: true,
      require: '^icecomm',
      template: '<video ng-if="local" autoplay class="icecomm-local"' +
        'ng-src={{local.stream}}></video>',
      link: function($scope, ele, atts, icecomm) {
        var comm = icecomm.comm;
        comm.on("local",function(peer){
          $scope.$apply(function () {
            peer.stream = $sce.trustAsResourceUrl(peer.stream);
            $scope.local = peer;
            console.log(peer);
            if (peer) {
             $http.post('/broadcastID', peer).success(function (data) {
              
             });
          }
          });
        });
      }
    };
  }