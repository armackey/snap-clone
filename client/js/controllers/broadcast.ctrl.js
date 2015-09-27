angular.module('app')
  .controller('broadcastCtrl', ['$http', 
    function ($http) {
  // user chooses to broadcast
  // unique room is created
  // room number is stored on server
  // other users view users who are currently broadcasting
  // theyre able to veiw by clicking on name
   this.broadcast = function () {
    var room = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i+=1 ) {
      room += possible.charAt(Math.floor(Math.random() * possible.length));
      console.log(room);
    }
    $http.post('/roomnumber', room, function () {

    });
  };
  

}]);