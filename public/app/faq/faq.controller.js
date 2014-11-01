'use strict';

angular.module('ngFullApp')
    .controller('FaqCtrl', function ($scope, $http, $stateParams, PageTitle, modalService/*, Modal, $modal, $rootScope, $translate, $location, createFormData*/) {
        $scope.faqs = [];
        $scope.item = {};


        /*Modal.confirm.delete(function (){console.log(9);})
            ('modal-primary', {title: "new title", html:"new html"});*/

        $scope.modalDemo = function (size) {

            var modalDefaults = {
                size: size || '',
                windowClass: 'modal-danger'
            };


            var modalOptions = {
                actionButtonText: 'Yes',
                headerText: 'Really ?',
                bodyText: 'Are you sure ?',
                modalButtonType: 'danger'
            };

            modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                console.log('yes');
            });
        };




        //$scope.item.files = {};

       /* $scope.setLang = function(langKey) {
            $translate.use(langKey);
        };*/

        var apiName = '/api/faq/';


        $scope.getAll = function () {
            PageTitle.setTitle('Faq');
            $http.get(apiName).success(function (data) {
                $scope.faqs = data;
            });
        }

        $scope.findOne = function () {
            $http.get(apiName + $stateParams.id).success(function (data) {
                $scope.item = data;
                PageTitle.setTitle($scope.item.title);
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
