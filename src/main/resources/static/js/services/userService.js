(function () {
    'use strict';

    angular.module('bikeRental').service('UserService', UserService);
    UserService.$inject = ['$http', '$q', 'API_URL'];

    function UserService($http, $q, API_URL) {
        var service = {
            getUserDetails: getUserDetails,
            getUserLoggedInAuthKey: getUserLoggedInAuthKey
        };
        return service;

        function getUserDetails() {
            console.log('Trying to retrieve user details from token...');
            var deferred = $q.defer();
            $http({
                url: API_URL.concat("/users/details"),
                method: "GET"
            }).then(
                function (response) {
                    deferred.resolve(response);
                },
                function (errResponse) {
                    console.log('Error while retrieving user details! Error: ' + errResponse.data);
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function getUserLoggedInAuthKey() {
          //  console.log($http.defaults.headers.common.Authorization);
            return $http.defaults.headers.common.Authorization;
        }
    }
}());