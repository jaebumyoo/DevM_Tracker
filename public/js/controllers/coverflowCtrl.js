angular.module('courseWork')
  .controller('coverflowCtrl', function($scope, $state, $window, $sce, coverflowService, dataService) {
    $scope.checkLogin = function() {
      if ( !$window.localStorage.days )
        $state.go( 'login' );
    }
    
    $scope.checkLogin();
    $scope.Math = window.Math;

////////////////////////////////// Get Data ///////////////////////////////////

    $scope.getData = function() {
      var localUser = JSON.parse($window.localStorage.user);
      var localDays = JSON.parse($window.localStorage.days);

      $scope.user = dataService.getInfo(localUser);
      $scope.days = dataService.getDays(localDays);

      $scope.months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      $scope.weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    }

    $scope.getData();

/////////////////////////////// Complete Checker //////////////////////////////

    $scope.completedDayChecker = function(day) {
      return coverflowService.completedDayChecker($scope.user, day);
    }

    $scope.completeChecker = function() {
      $scope.completed = coverflowService.completeChecker($scope.user, $scope.today);
    }

//////////////////////////////// Link To Today ////////////////////////////////

    $scope.todaysWork = function() {
      var todaysWork;

      if ($scope.user.email === "demo@test.com") {
        todaysWork = coverflowService.demoTodaysWork($scope.days);
        $scope.todayModal(todaysWork[1]);
      } else {
        todaysWork = coverflowService.todaysWork($scope.days);
        $scope.todayModal(todaysWork[1]);
      }

      return todaysWork[0];
    }

//////////////////////////////// Modal Setting ////////////////////////////////

    var modal = document.getElementsByClassName("modal")[0];
    var info = document.getElementsByClassName("user-info-wrapper")[0];

    $scope.infoModal = function() {
      modal.style.display = 'none';
      info.style.display = 'block';
    }

    $scope.todayModal = function(day) {
      if (day) {
        $scope.today = day;
        info.style.display = 'none';
        modal.style.display = 'block';
        $scope.completed = coverflowService.updateCheckBoxes($scope.user, day);

        return $scope.days.indexOf(day);
      }
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none'
      }
      else if (event.target == info) {
        info.style.display = 'none'
      }
    }

/////////////////////////////////// LogOut ////////////////////////////////////

    $scope.logout = function() {
      $window.localStorage.clear();

      $state.go( 'login' );
    }
});
