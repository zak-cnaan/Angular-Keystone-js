'use strict';

angular.module('ngFullApp')
    .controller('ContactCtrl', function ($scope, $http) {
        $scope.formData = {};

        $scope.formData.name = "zak";
        $scope.formData.message = "hi, sdf sdf sdf sfds dfsdf sfdfsdf sdfsdf sdfs fsdfsdf sdfsdf sdfsdfsdf<scipt>alert(9);</scipt>";

        var apiName = '/api/contact/';


        $scope.sendForm = function (){

            console.log($scope.formData);
        };

        $scope.clearForm = function (){

            $scope.formData = {};
        };

        $http.post(apiName, $scope.formData)
            .success(function (data) {
                //$scope.formData = {data: data};
                console.log(data);
            })
            .error(function (data){
                console.log(data);

            });

       /* $http.post(apiName, $scope.item)
            .success(function (data) {
                $scope.formData = {data: data};
            })
            .error(function (){

            });*/


    });
