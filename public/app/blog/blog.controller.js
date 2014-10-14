'use strict';

angular.module('ngFullApp')
    .controller('BlogCtrl', function ($scope, $http, $stateParams/*, $location, createFormData*/) {
        $scope.posts = [];
        $scope.item = {};
        //$scope.item.files = {};

        var apiName = '/api/blog/';


        $scope.getAll = function () {
            if ($stateParams.cat){
                $http.get(apiName + $stateParams.cat).success(function (data) {
                    $scope.posts = data;
                });
            }
            else {
                $http.get(apiName).success(function (data) {
                    $scope.posts = data;
                });
            }
        }

        $scope.findOne = function () {
            $http.get(apiName + "post/" + $stateParams.id).success(function (data) {
                $scope.item = data;
            });
        };

        $scope.countPosts = function (){
            return "123 posts";

        };



    });
