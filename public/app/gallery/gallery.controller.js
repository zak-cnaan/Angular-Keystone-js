'use strict';

angular.module('ngFullApp')
    .controller('GalleryCtrl', function ($scope, $http, $stateParams, PageTitle/*, $location, createFormData*/) {
        $scope.gallerys = [];
        $scope.item = {};
        //$scope.item.files = {};

        var apiName = '/api/gallery/';


        $scope.getAll = function () {
            PageTitle.setTitle("Gallery");
            $http.get(apiName).success(function (data) {
                $scope.gallerys = data;
            });
        }

        $scope.findOne = function () {
            $http.get(apiName + $stateParams.id).success(function (data) {
                $scope.item = data;
                PageTitle.setTitle($scope.item.name);
            });
        };


    });
