'use strict';

angular.module('ngFullApp')
    .controller('ContactCtrl', function ($scope, $http) {
        $scope.formData = {};

        var apiName = '/api/contact/';

        $scope.submitted = false;
        $scope.masgSent = {sent: false, ok: false};


        $scope.sendForm = function (){
            $scope.submitted = true;

            if ($scope.form.$valid) {

                $http.post(apiName, $scope.formData)
                    .success(function (data) {
                        $scope.masgSent = {sent: true, ok: true};
                        $scope.clearForm();
                        console.log(data);
                    })
                    .error(function (data) {
                        $scope.masgSent = {sent: true, ok: false};
                        console.log(data);


                    });

            }
        };

        $scope.clearForm = function (){
            $scope.formData = {};
            $scope.submitted = false;
        };





    });
