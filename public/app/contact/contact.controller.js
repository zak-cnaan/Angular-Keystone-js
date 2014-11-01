'use strict';

angular.module('ngFullApp')
    .controller('ContactCtrl', function ($scope, $http, flash, PageTitle) {
        $scope.formData = {};
        PageTitle.setTitle("Contact Us");

        var apiName = '/api/contact/';

        $scope.submitted = false;

        $scope.sendForm = function (){
            $scope.submitted = true;

            if ($scope.form.$valid) {

                $http.post(apiName, $scope.formData)
                    .success(function () {
                        $scope.clearForm();
                        flash.success = 'Message Sent!';
                    })
                    .error(function () {
                        flash.error = 'We have a problem ...';
                    });

            }
        };

        $scope.clearForm = function (){
            $scope.formData = {};
            $scope.submitted = false;
        };





    });
