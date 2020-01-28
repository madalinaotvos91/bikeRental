'use strict';

angular
    .module('bikeRental')
    .controller('RegisterController', RegisterController);

RegisterController.$inject = ['$rootScope', '$location', 'RegistrationService', 'NotificationService'];

function RegisterController($rootScope, $location, RegistrationService, NotificationService) {
    var vm = {
        submit: submit
    };

    return vm;

    vm.user = {};
    vm.user.email = "";
    vm.user.username = "";

    function submit() {
        console.log('Submitting registration...');
        RegistrationService.register(vm.user)
            .then(function (response) {
                $location.url("/");
                NotificationService.Success("Registration successful! Please log in!", true);
            }).catch(function (error) {
            if (error.status === 409) {
                $location.url("/");
                NotificationService.Error("You are already registered! Please try to log in!", true);
            } else {
                console.log("Error while registering user: " + error);
                NotificationService.Error("Error occurred while registering the user! Please try again!", false);
            }
        });
    }
}