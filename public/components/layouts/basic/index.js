'use strict';

angular.module('ngFullApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('basic', {
                abstract: true,
                templateUrl: 'components/layouts/basic/index.html'
            })

    });