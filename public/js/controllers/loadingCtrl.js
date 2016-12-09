angular.module('courseWork')
  .controller('loadingCtrl', function($scope, $window, $state, dataService) {

  $scope.getData = function() {
    dataService.getData().then( response => {
      days = response.data;
      $window.localStorage.setItem('days', JSON.stringify(days));

      $state.go('coverflow');
    });
  }

  $scope.getData();
});
