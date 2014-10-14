'use strict';

angular.module('ngFullApp')
    .controller('BlogCtrl', function ($scope, $http, $stateParams/*, $location, createFormData*/) {
        $scope.posts = [];
        $scope.cats = [];
        $scope.item = {};
        $scope.ready = false;
        //$scope.item.files = {};

        var apiName = '/api/blog/';

        $http.get('/api/blogcat').success(function (data) {
            $scope.cats = data;
        });


        $scope.getAll = function () {
            if ($stateParams.cat){
                $http.get(apiName + $stateParams.cat).success(function (data) {
                    $scope.posts = data;
                    $scope.ready = true;
                });
            }
            else {
                $http.get(apiName).success(function (data) {
                    $scope.posts = data;
                    $scope.ready = true;

                });
            }
        }

        $scope.findOne = function () {
            $http.get(apiName + "post/" + $stateParams.id).success(function (data) {
                $scope.item = data;
            });
        };

        $scope.countPosts = function (){
            var str;
            str = $scope.posts.length + " post"

            if ($scope.posts.length > 1)
                str += "s";

            return str;

        };

        $scope.isCatActive = function (cat){
            if (cat == 'all') {
                return !($stateParams.cat);
            }
            else{
                return (cat == $stateParams.cat);
            }

        }



    });
