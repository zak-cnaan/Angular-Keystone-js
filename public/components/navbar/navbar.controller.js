'use strict';

angular.module('ngFullApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
    {
      'title': 'Home',
      'link': '/'
    },
        {
            'title': 'Faq',
            'link': '#/faq'
        },
        {
            'title': 'Contact',
            'link': '#/contact'
        }

    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      var idx = route.indexOf($location.path());
        if (idx == -1 || $location.path() == '/')
            return route == $location.path();

        return true;
    };

        console.log($location.path())

  });