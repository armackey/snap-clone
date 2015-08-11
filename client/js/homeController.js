angular.module('app').controller('homeController',['$http','$scope', '$interval', function ($http, $scope, $interval) {
  this.newMessage = {};
  this.newMessage.date= Date.now();

  $interval(function () {
    $http.get('/comments').success(function (data){
     $scope.data=data;
  });
  }, 3000);


  this.sendMessage = function(){
  $http.post('/comments', this.newMessage).success(function (data){
      console.log("data from post comment is " + data);
      $scope.data.push(data);
      // $scope.newMessage.username = " ";
      // $scope.newMessage.message = " ";
    });
  };


  $scope.takePic = function () {
    var local = document.getElementById('local');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var photo = document.getElementById('photo');
    context.drawImage(local, 0, 0, 310, 150);
    // photo.setAttribute('src', canvas.toDataURL('image/png'));
    // canvas.style.width = "0xp";
    // canvas.style.height = "0xp";
    // photo.style.width = "400px";
    // photo.style.height = "250px";
    console.log('work');

  };

}]);
