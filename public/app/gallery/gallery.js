'use strict';

angular.module('ngFullApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('gallery', {
                url: '^/gallery',
                templateUrl: 'app/gallery/gallery.html',
                controller: 'GalleryCtrl',
                parent: 'basic'
            })
            .state('galleryItem', {
                url: '^/gallery/:id',
                templateUrl: 'app/gallery/galleryItem.html',
                controller: 'GalleryCtrl',
                parent: 'basic'

            })/*
            .state('editItem', {
                url: '/faq/edit/:id',
                templateUrl: 'app/faq/editItem.html',
                controller: 'FaqCtrl'
            })*/
    });