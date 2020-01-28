(function () {
    'use strict';
    angular
        .module('bikeRental')
        .service('RegistrationService', RegistrationService);
    RegistrationService.$inject = ['$http', '$q', 'API_URL'];

    function RegistrationService($http, $q, API_URL) {

        var service = {
            register: register,
            removeAccount: removeAccount
        };

        return service;

        function register(user) {
            console.log('Trying to register user ' + user);
            var deferred = $q.defer();
            $http.post(API_URL + "/users/register", user)
                .then(
                    function (response) {
                        console.log("User successfully created!");
                        deferred.resolve(response);
                    },
                    function (errResponse) {
                        console.error('Error while creating entry : ' + user.email + "\n Details: " + errResponse.data);
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function removeAccount(userId) {
            var deferred = $q.defer();
            $http.delete(API_URL.concat("/users/") + userId)
                .then(
                    function (response) {
                        console.log('Account id: ' + userId + " removed successfully!");
                        $http.defaults.headers.common.Authorization = "";
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.error('Error while removing entry with id :' + userId);
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }
    }
}());