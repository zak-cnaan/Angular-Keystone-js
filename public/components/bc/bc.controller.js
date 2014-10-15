'use strict';

angular.module('ngFullApp')
  .controller('BcCtrl', function ($scope, $location, $state) {

        $scope.states = [];
        var source = $state.$current.data || $state.$current.url.source.split('/');

        $scope.arr = source;

        console.log($state.$current.data);

        $scope.arr.forEach(function (i){
            if (i != "" && i.indexOf(':') == -1){
                $scope.states.push(i);
            }
        });


        $scope.path = ($location.path());

        console.log($scope)
// console.log($state)

/*        $scope.states = [];

        $scope.arr = $state.$current.path;
        $scope.arr.forEach(function (i){
            if (!i.abstract && i.name != 'home' && i.ownParams.length == 0) {
                i.data = i.data || {};
                i.data.title = i.data.title || i.name;
                $scope.states.push(i);
            }
        });

        console.log($state.$current);

        $scope.path = ($location.path());*/

  });