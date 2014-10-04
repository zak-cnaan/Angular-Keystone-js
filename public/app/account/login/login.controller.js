'use strict';

angular.module('ngFullApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $http) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
/*
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }*/
        if(form.$valid || true) {
            $http.post('/auth/login', $scope.user)
                .success(function () {
                    //$location.path( "/faq/" + $scope.item._id );
                    console.log("suces: ");
                })
                .error(function () {
                    console.log("err: ");

                });

        }

        };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
