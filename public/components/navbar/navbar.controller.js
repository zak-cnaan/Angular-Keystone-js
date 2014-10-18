'use strict';

angular.module('ngFullApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
    {
      'title': 'Home',
      'link': '#/'
    },
        {
            'title': 'Faq',
            'link': '#/faq'
        },
        {
            'title': 'Contact',
            'link': '#/contact'
        },
        {
            'title': 'Gallery',
            'link': '#/gallery'
        },
        {
            'title': 'Blog',
            'link': '#/blog'
        },
        {
            'title': 'Thumb',
            'link': '#/thumb'
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

        var idx = ("#" + $location.path()).indexOf(route);
        if (idx > -1){
            if (route == '#/')
                return route == "#" + $location.path();
            return true;
        }
        return false;
    };


  });