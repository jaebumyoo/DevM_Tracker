angular.module('courseWork')
  .controller('loginCtrl', function($scope, dataService) {
  $scope.error = false;

  $scope.email = "demo@test.com";
  $scope.password = "000000";

  $scope.login = function(email, password) {
    $scope.error = dataService.login(email, password);
  }
});
