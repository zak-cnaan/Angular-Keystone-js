'use strict';

angular.module('ngFullApp')
    .controller('FaqCtrl', function ($scope, $http, $stateParams/*, $translate, $location, createFormData*/) {
        $scope.faqs = [];
        $scope.item = {};
        //$scope.item.files = {};

       /* $scope.setLang = function(langKey) {
            $translate.use(langKey);
        };*/

        var apiName = '/api/faq/';


        $scope.getAll = function () {
            $http.get(apiName).success(function (data) {
                $scope.faqs = data;
            });
        }

        $scope.findOne = function () {
            $http.get(apiName + $stateParams.id).success(function (data) {
                $scope.item = data;
            });
        };

        /*
        $scope.addEditItem = function () {

            if ($scope.add_item_form.$invalid) {
                return false;
            }

            var fd = createFormData.createData($scope.item.files);

            if (fd.hasFiles){
                $http.post('/api/uploads/', fd.formData, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                    .success(function (data) {
                        angular.forEach(data, function(file, fieldName) {
                            $scope.item.files[fieldName] = file;
                        });
                        sendItemDate();
                    })

            }
            else {
                sendItemDate();
            }


            function sendItemDate(){

                if ($scope.item._id) {

                     $http.put('/api/faqs/' + $scope.item._id, $scope.item)
                     .success(function () {
                     $location.path( "/faq/" + $scope.item._id );
                     });

                } else {




                     $http.post('/api/faqs/', $scope.item)
                     .success(function (data) {
                     $scope.faqs.push(data);
                             $scope.item = {};

                     });


                }


            };
        };


        $scope.deleteItem = function (item) {
            $http.delete('/api/faqs/' + item._id)
                .success(function () {
                    $scope.faqs.splice($scope.faqs.indexOf(item), 1);
                });
        };
        */


    });
