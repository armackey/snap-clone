angular
  .module('app')
    .controller('homeCtrl', ['$http','$scope', '$interval', 'Comment',
      function ($http, $scope, $interval, Comment) {
        
        var self = this;
        // on load, load all comments
        this.comment = Comment.query();
        // update comments feed every 3 seconds
        $interval(function () {
          // self.comment = Comment.query();
        }, 3000);


        this.sendMessage = function() {
          var comment = new Comment();
          comment.username = self.comment.username;
          comment.comment = self.comment.comment;
          comment.$save(function () {
            self.comment = Comment.query();
          });
          
          
        // $http.post('/comments', this.newMessage).success(function (data){
          
        //   });
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