(function () {
    'use strict';

    angular.module('bikeRental').service('LoginService', LoginService);
    LoginService.$inject = ['$http','$q', 'API_URL'];

    function LoginService($http, $q, API_URL) {
        var service = {
            login: login,
            logout: logout
        };
        return service;

        function login(user) {
            console.log('Trying to log in user: ' + user);
            var deferred = $q.defer();
            $http.post(API_URL + "/token", user)
                .then(
                    function (response) {
                        console.log("User logged " + response.data.username + " in successfully!");
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                        deferred.resolve(response);
                    },
                    function (errResponse) {
                        console.error('Error while login in user : ' + user.email + "\n Details: " + errResponse.data);
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }
        function logout() {
            $http.defaults.headers.common.Authorization = "";
        }
    }


}());