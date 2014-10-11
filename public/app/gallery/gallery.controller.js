'use strict';

angular.module('ngFullApp')
    .controller('GalleryCtrl', function ($scope, $http, $stateParams/*, $location, createFormData*/) {
        $scope.gallerys = [];
        $scope.item = {};
        //$scope.item.files = {};

        var apiName = '/api/gallery/';


        $scope.getAll = function () {
            $http.get(apiName).success(function (data) {
                $scope.gallerys = data;
            });
        }

        $scope.findOne = function () {
            $http.get(apiName + $stateParams.id).success(function (data) {
                $scope.item = data;
            });
        };


    });
