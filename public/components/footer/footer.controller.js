'use strict';

angular.module('ngFullApp')
  .controller('FooterCtrl', function ($scope, $location) {
    $scope.menu = [
    {
      'title': 'keystonejs',
      'link': 'http://keystonejs.com/'
    },
    {
      'title': 'angular-fullstack',
      'link': 'https://github.com/DaftMonk/generator-angular-fullstack'
    }

    ];



    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });