'use strict';

angular.module('ngFullApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
            data: {
                title: 'home page'
            }
      });
  });