'use strict';

angular.module('ngFullApp')
  .controller('BcCtrl', function ($scope, $location, $state) {

        $scope.states = [];
        var source = $state.$current.data || $state.$current.url.source.split('/');

        $scope.arr = source;

        $scope.arr.forEach(function (i){
            if (i != "" && i.indexOf(':') == -1){
                $scope.states.push(i);
            }
        });


        $scope.path = ($location.path());



  });