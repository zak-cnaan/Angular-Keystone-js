'use strict';

angular.module('ngFullApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('blog', {
                url: '^/blog',
                templateUrl: 'app/blog/blog.html',
                controller: 'BlogCtrl',
                parent: 'basic'
            })
            .state('blogItem', {
                url: '^/blog/:id',
                templateUrl: 'app/blog/blogItem.html',
                controller: 'BlogCtrl',
                parent: 'basic'

            })
    });