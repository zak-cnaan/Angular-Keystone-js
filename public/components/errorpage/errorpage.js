'use strict';

angular.module('ngFullApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('errorpage', {
        url: '/errorpage',
        templateUrl: 'components/errorpage/errorpage.html',
        controller: 'ErrorpageCtrl'
      });
  });