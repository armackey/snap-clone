angular.module('app').controller('homeController',['$http','$scope', function ($http, $scope){
  this.newMessage = {};
  this.newMessage.date= Date.now();

  var that = this;
  $http.get('/comments').success(function(data){
     $scope.data=data;
  });

  this.sendMessage = function(){
    $http.post('/comments',this.newMessage).success(function(data,status){
      $scope.data.push(data);
      this.newMessage.username = "";
      $scope.newMessage.message = "";
    });
  };

}]);
