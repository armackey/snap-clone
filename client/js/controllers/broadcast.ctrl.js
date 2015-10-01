angular
  .module('app')
    .controller('broadcastCtrl', ['userService', '$scope', '$http', '$stateParams', '$resource', 'Comment', '$interval', 'Auth', 
      function (userService, $scope, $http, $stateParams, $resource, Comment, $interval, Auth) {

        $scope.isLoggedIn = Auth.isLoggedIn;
        console.log($scope.isLoggedIn);
        // we injected userService and allowed to search for all users/one specific user with the query object
        //  set it equal to this.users so we have access to it in view
        var self = this;
        self.users = userService.query();
        $scope.user = userService.get({id: $stateParams.id});

        self.pictures = [];
        // have to use a callback to recieve the object else the promise object returns
        // $scope.user.$promise.then(function(data) {
        //   // this is the room number of selected user
        //   $scope.roomNumber = data.room; 
        // });

        // on load, load all comments
        // query object is a part of $resource
        this.comment = Comment.query();

        // update comments feed every 3 seconds
        $interval(function () {
          // self.comment = Comment.query();
        }, 3000);
        

        this.sendMessage = function() {
          var comment = new Comment();
          comment.username = Auth.currentUser;
          comment.comment = self.comment.comment;
          comment.$save(function () {
            self.comment = Comment.query();
          });
          
        };


        this.takePic = function () {
          var peer = document.getElementById('peer');
          var canvas = document.getElementById('canvas');
          var context = canvas.getContext('2d');
          var photo = document.getElementById('photo');
          context.drawImage(peer, 0, 0, canvas.width, canvas.height);
          
          
            self.pictures.push({path: context.drawImage(peer, 0, 0, canvas.width, canvas.height)});  
          
          // photo.setAttribute('src', canvas.toDataURL('image/png'));
          // canvas.style.width = "0xp";
          // canvas.style.height = "0xp";
          // canvas.style.width = "400px";
          // canvas.style.height = "250px";
        };

      
      
  }]);