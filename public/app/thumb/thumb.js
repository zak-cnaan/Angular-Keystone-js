'use strict';

angular.module('ngFullApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('thumb', {
                url: '^/thumb',
                templateUrl: 'app/thumb/thumb.html',
                controller: 'ThumbCtrl',
                parent: 'basic'
            })
    });