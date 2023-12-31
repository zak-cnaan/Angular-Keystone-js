'use strict';

angular.module('ngFullApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('faq', {
                url: '^/faq',
                templateUrl: 'app/faq/faq.html',
                controller: 'FaqCtrl',
                parent: 'basic'
            })
            .state('faqItem', {
                url: '^/faq/:id',
                templateUrl: 'app/faq/faqItem.html',
                controller: 'FaqCtrl',
                parent: 'basic'

            })/*
            .state('editItem', {
                url: '/faq/edit/:id',
                templateUrl: 'app/faq/editItem.html',
                controller: 'FaqCtrl'
            })*/
    });