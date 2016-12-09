angular.module('courseWork')
  .service('coverflowService', function(dataService) {
/////////////////////////////// Complet Checker ///////////////////////////////

  this.completedDayChecker = function(user, today) {
    for (var i = 0; i < user.completedDays.length; i++)
      if (+user.completedDays[i] === +today.$date)
        return true;

    return false;
  }

  this.updateCheckBoxes = function(user, today) {
    if (this.completedDayChecker(user, today)) {
      for (var subject in today)
        for (var i = 0; i < today[subject].length; i++)
            today[subject][i].complete = true;
      return true;
    }

    return false;
  }

  this.completeChecker = function(user, today) {
    var checker = [];

    for (var subject in today) {
        for (var i = 0; i < today[subject].length; i++)
            if (today[subject][i].complete === false)
              checker.push(false);
    }

    if (checker.indexOf(false) < 0) {
      if (!this.completedDayChecker(user, today)) {
        user.completedDays.push(today.$date)
        dataService.updateUserInfo(user);
      }

      return true;
    }

    else {
      for (var i = 0; i < user.completedDays.length; i++)
        if (+user.completedDays[i] === +today.$date) {
            user.completedDays.splice(i, 1);
            dataService.updateUserInfo(user)
            break;
        }

      return false;
    }
  }

//////////////////////////////// Link To Today ////////////////////////////////

  this.todaysWork = function(days) {
    var todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0, 0);

    for (var i = 0; i < days.length; i++) {
      if (+days[i].$date === +todaysDate)
        return [i, days[i]];

      else if (todaysDate < days[i].$date && days[i - 1].$date < todaysDate)
        return [i - 1, days[i - 1]];
    }

    return [0, undefined];
  }

///////////////////////////// Link To Today, Demo /////////////////////////////

  this.demoTodaysWork = function(days) {
    var todaysDate = new Date(2016, 9, 6);
    todaysDate.setHours(0, 0, 0, 0, 0);

    for (var i = 0; i < days.length; i++) {
      if (+days[i].$date === +todaysDate)
        return [i, days[i]];

      else if (todaysDate < days[i].$date && days[i - 1].$date < todaysDate)
        return [i - 1, days[i - 1]];
    }

    return [0, undefined];
  }
});
