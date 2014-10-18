'use strict';

angular.module('ngFullApp')
    .controller('ThumbCtrl', function ($scope, $http, $stateParams/*, $location, createFormData*/) {
        $scope.thumbs = [];
        var apiName = '/api/thumb/';

        $scope.getAll = function () {
            $http.get(apiName).success(function (data) {
                $scope.thumbs = data;
            });
        }
    });
