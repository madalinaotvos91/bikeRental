(function () {
    'use strict';

    angular.module('bikeRental', ['ui.router']).config(config).constant({API_URL:"http://localhost:8080/BikeRental/api"});
    config.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];
    function config($stateProvider,$urlRouterProvider,$locationProvider) {
        $stateProvider
            .state('home', {
                url:  '/home',
                controller: 'HomeController',
                templateUrl: 'partials/home.ftl',
                controllerAs: 'vm'
            })

            .state('login', {
                url:  '/',
                controller: 'LoginController',
                templateUrl: 'partials/login.ftl',
                controllerAs: 'vm'
            })

            .state('register', {
                url:  '/register',
                controller: 'RegisterController',
                templateUrl: 'partials/register.ftl',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/');
    }
})();