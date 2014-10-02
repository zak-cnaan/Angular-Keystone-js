'use strict';

angular.module('ngFullApp')
  .controller('ErrorpageCtrl', function ($scope, $http, $rootScope) {
        $scope.errorpage = $rootScope.errorpage || {
            data: {error: "Unknown error"}
        };

        $rootScope.errorpage = {};
        delete $rootScope['errorpage'];
  });
