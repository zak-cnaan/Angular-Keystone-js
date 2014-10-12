'use strict';

angular.module('ngFullApp')
    .controller('BlogCtrl', function ($scope, $http, $stateParams/*, $location, createFormData*/) {
        $scope.posts = [];
        $scope.item = {};
        //$scope.item.files = {};

        var apiName = '/api/post/';


        $scope.getAll = function () {
            $http.get(apiName).success(function (data) {
                $scope.posts = data;
            });
        }

        $scope.findOne = function () {
            $http.get(apiName + $stateParams.id).success(function (data) {
                $scope.item = data;
            });
        };



    });
