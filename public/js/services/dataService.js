angular.module('courseWork')
  .service('dataService', function($state, $window, $http) {

  this.login = function(email, password) {
    var returnValue = false;

    $http.post( `api/fireBase/login`, { email, password } ).then( response  => {
      $window.localStorage.setItem( 'user', JSON.stringify( response.data ) );
      $state.go('loading');
    } ).catch( error => {
      document.getElementById( 'login-warning' ).style.display = 'block';
    } );

    return;
  }

  this.getData = function() {
    return $http.get( `api/fireBase/getData` );
  }

  this.getInfo = function(localUser) {
    if (!user)
      user = localUser;

    for (var i = 0; i < user.completedDays.length; i++)
      user.completedDays[i] = new Date(user.completedDays[i]);

    return user;
  }

  this.getDays = function(localDays) {
    if (!days)
      days = localDays;

    for (var i = 0; i < days.length; i++) {
      if ('date' in days[i]) {
        days[i].$date = new Date(days[i].date);
        delete days[i].date;
      }

      if ('title' in days[i]) {
        days[i].$title = days[i].title;
        delete days[i].title;
      }
    }

    return days;
  }

  this.updateUserInfo = function(userInfo) {
    var updatedDays = [];

    for (var i = 0; i < userInfo.completedDays.length; i++) {
      updatedDays.push(userInfo.completedDays[i].toJSON());
    }

    $window.localStorage.setItem('user', JSON.stringify(userInfo));

    $http.post( `api/fireBase/updateUserInfo`, updatedDays ).then( response => {
      return;
    } )
  }

  var days, user;
});
