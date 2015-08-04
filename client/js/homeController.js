angular.module('app').controller('homeController',['$http','$scope',function($http,$scope){
  this.newMessage = {};
  this.newMessage.username = "";
  this.newMessage.message = "";
  this.newMessage.date= Date.now();

  this.products = "hello world";
  var that = this;
  $http.get('/comments').success(function(data){
     console.log(data[0]);
     that.data=data[0];
  });
  //form information gets sent to server and post the new message to page
  // $http.post('/comments',this.newMessage).success(function(data,status){
  //   //console.log(data);
  // });
}]);
