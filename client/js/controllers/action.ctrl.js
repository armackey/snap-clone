angular.module('app').controller('actionCtrl', ['$scope', function ($scope) {
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