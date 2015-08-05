angular.module('app').controller('homeController',['$http','$scope', function ($http, $scope){
  this.newMessage = {};
  this.newMessage.date= Date.now();

  var that = this;
  $http.get('/comments').success(function(data){
     $scope.data=data;
  });

  this.sendMessage = function(){
    $http.post('/comments', this.newMessage).success(function (data, status){
      console.log("data from post comment is " + data);
      $scope.data.push(data);
      // $scope.newMessage.username = " ";
      // $scope.newMessage.message = " ";
    });
  };

}]);
