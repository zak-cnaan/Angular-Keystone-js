'use strict';

angular.module('ngFullApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('test', {
                url: '^/test',
                templateUrl: 'app/test/test.html',
                controller: 'TestCtrl',
                parent: 'basic'
            })

    });