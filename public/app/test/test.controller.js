'use strict';

angular.module('ngFullApp')
    .controller('TestCtrl', function ($scope, $http) {
        $scope.faqs = [];
        $scope.item = {};
        //$scope.item.files = {};

        var apiName = '/api/faq/';


        $scope.getAll = function () {
            $http.get(apiName).success(function (data) {
                $scope.faqs = data;
            });
        }

    });
