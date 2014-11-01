'use strict';

angular.module('ngFullApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'angular-flash.service',
    'angular-flash.flash-alert-directive',
    'pascalprecht.translate',
    'angularUtils.directives.dirPagination'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(false);
        $httpProvider.interceptors.push('authInterceptor');

    })

    .config(['$translateProvider', function($translateProvider){
// Register a loader for the static files
// So, the module will search missing translation tables under the specified urls.
// Those urls are [prefix][langKey][suffix].
        /*$translateProvider.useStaticFilesLoader({
            prefix: 'i10n/',
            suffix: '.json'
        });*/

        $translateProvider.useUrlLoader('components/i10n/en.json');


// Tell the module what language to use by default
        $translateProvider.preferredLanguage('en');
    }])

    .config(function (flashProvider) {
// Support bootstrap 3.0 "alert-danger" class with error flash types
        flashProvider.errorClassnames.push('alert-danger');
        /**
         * Also have...
         *
         * flashProvider.warnClassnames
         * flashProvider.infoClassnames
         * flashProvider.successClassnames
         */
    })

    .factory('PageTitle', function($rootScope) {
        var defaultTitle = $rootScope.pageDefaultTitle;
        var title = defaultTitle;
        return {
            setTitle: function(newTitle) {
                title = defaultTitle + " - " + newTitle;
                $rootScope.pageTitle = title;
            }
        };
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                }
                else {
                    $rootScope.errorpage = response;
                    $location.path('/errorpage');
                    return $q.reject(response);
                }
            }
        };
    })


    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.pageDefaultTitle = "My app";
        $rootScope.pageTitle = "My app";
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function (loggedIn) {

                if (next.authenticate && !loggedIn) {
                    $location.path('/login');


                }
            });
        });
    });

