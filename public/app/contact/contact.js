'use strict';

angular.module('ngFullApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact',
                templateUrl: 'app/contact/contact.html',
                controller: 'ContactCtrl'
            });
    });