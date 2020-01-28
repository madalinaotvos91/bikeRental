(function () {
    'use strict';

    angular.module('bikeRental').service('NotificationService', NotificationService);

    NotificationService.$inject = ['$rootScope'];
    function NotificationService($rootScope) {
        var service = {};

        service.Success = Success;
        service.Error = Error;
        initService();

        return service;

        function initService() {


            $rootScope.$on('$locationChangeStart', function () {
                if($rootScope.flash != null) {
                    if (!$rootScope.flash.keepAfterLocationChange) {
                        clearNotificationMessage();
                    } else {
                        $rootScope.flash.keepAfterLocationChange = false;
                    }
                }
            });

            function clearNotificationMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }
})();