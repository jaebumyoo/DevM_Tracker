angular.module('courseWork', ['ui.router', 'angular-cardflow'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login',{
            url:'/',
            templateUrl: '/views/login.html',
            controller: 'loginCtrl'
        })
        .state('loading',{
            url:'/loading',
            templateUrl: '/views/loading.html',
            controller: 'loadingCtrl'
        })
        .state('coverflow',{
            url:'/coverflow',
            templateUrl: '/views/coverflow.html',
            controller: 'coverflowCtrl'
        });

    $urlRouterProvider
        .otherwise('/');
});
