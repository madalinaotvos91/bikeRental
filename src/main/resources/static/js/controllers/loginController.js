'use strict';

angular.module('bikeRental').controller('LoginController', LoginController);
LoginController.$inject = ['$location', '$http', 'LoginService', 'NotificationService'];

function LoginController($location, $http, LoginService, NotificationService) {

    var vm = {
        submit: submit
    }
    return vm;

    vm.user = {};
    vm.user.email = "";
    vm.user.username = "";

    function submit() {
        console.log('Submitting user log in: ' + vm.user.email);
        LoginService.login(vm.user).then(function (response) {
            $location.url("/home");
        }).catch(function (error) {
            console.log("Error while login in user: " + vm.user.email + "\n Details: " + error.status + "\n" + error.data);

            if (error.status === 401) {
                NotificationService.Error("Wrong username password combination! Make sure you already registered!", false);
            } else {
                if (error.status === 500) {
                    NotificationService.Error("Make sure you are registered!", false);
                } else {
                    NotificationService.Error("Couldn't log in, something went wrong on server side! Please try again!", false);
                }
            }
        });
    }
}