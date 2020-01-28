'use strict';
var markedBike = null;
var user;
var hasUserRentedBike = false;
var authKey = "";

angular
    .module('bikeRental')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$location', 'LoginService', 'UserService', 'HomeService', 'NotificationService', 'RegistrationService'];

function HomeController($scope, $location, LoginService, UserService, HomeService, NotificationService, RegistrationService) {
    var vm = {
        init: init,
        initMap: initMap,
        submit: submit,
        removeAccount: removeAccount
    }
    return vm;

    function removeAccount() {
        RegistrationService.removeAccount(user.id).then(function (response) {
            $location.url("/");
            initGlobals();
            NotificationService.Success("Account removed successfully! Logged out automatically!", true);
        }).catch(function (error) {
            console.log("Couldn't remove account! Error: " + error.status + error.data);
        });
    }

    function init() {
        authKey = UserService.getUserLoggedInAuthKey();
        if (authKey === undefined || authKey === "") {
            $location.url("/");
            NotificationService.Error("Please log in first!", true);
        } else {
            UserService.getUserDetails().then(function (response) {
                vm.user = response.data;
                user = vm.user;
                initMap();
            }).catch(function (error) {
                if (error.status === 401) {
                    NotificationService.Error("Your session has expired. Please log in first!", true);
                }
                console.log(error);
            });
        }
    }

    function initMap() {
        HomeService.getBicycles().then(function (response) {
            vm.bicycles = response.data;

            var map = new L.Map('map').locate({setView: true, maxZoom: 16});
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: 18
            }).addTo(map);
            map.attributionControl.setPrefix('');

            for (var i = 0; i < vm.bicycles.length; i++) {
                var bike = vm.bicycles[i];
                var popupContent = getMarkerContent(bike);
                var statusIcon = new L.icon({
                    iconUrl: bike.rented === true ? 'https://cdn4.iconfinder.com/data/icons/miu/24/map-location-pin-map-marker-glyph-128.png'
                        : 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png',
                    iconSize: [25, 45],
                });

                var markerLocation = new L.LatLng(bike.latitude, bike.longitude);
                var marker = new L.Marker(markerLocation, {
                    icon: statusIcon,
                    bike: bike
                });
                if (vm.bicycles[i].email === user.email) {
                    markedBike = marker;
                    hasUserRentedBike = true;
                }

                map.addLayer(marker);
                marker.bindPopup(popupContent);
                marker.on('click', onMarkerClick);
            }
        }).catch(function (error) {
            console.log(error.data);
        })

    }

    function initGlobals() {
        markedBike = null;
        user = {};
        hasUserRentedBike = false;
        authKey = "";
    }

    function onMarkerClick(e) {
        markedBike = this;
        UserService.getUserDetails().then(function (response) {
        }).catch(function (error) {
            if (error.status === 401) {
                NotificationService.Error("Your session has expired. Please log in first!", true);
                LoginService.logout();
                $location.url("/");
                initGlobals();
            }
        });
    }

    function getMarkerContent(bike) {
        var content = "<div align='center' class='inline'><i class='fa fa-bicycle fa-2x'></i><p>" + bike.name + "</p></div>";
        var markerBikeInstructions = "<ol><li>Click on 'Rent Bicycle'</li><li>Bicycle lock will unlock automatically</li><li>Adjust saddle height</li>&nbsp;</ol>";
        var rentAvailableBikeButtonHtml = "<div align='center'><button type='button' class='btn btn-primary' onclick='rentBike()'>Rent Bike</button></div>&nbsp;";
        var returnBikeButtonHtml = "<div align='center'></div><button type='button' class='btn btn-primary' onclick='returnBike()'>Return Bicycle</button>&nbsp;</div>"

        if (!bike.rented) {
            content = content.concat(markerBikeInstructions).concat(rentAvailableBikeButtonHtml);
        } else {
            if (bike.email === user.email) {
                content = content.concat(returnBikeButtonHtml);
            } else {
                content = content.concat("<div>Bike will be available soon!</div>");
            }
        }
        return content;
    }

    function submit() {
        console.log('Submitting user log out...');
        LoginService.logout();
        $location.url("/");
        initGlobals();
    }
}


function rentBike() {
    if (!hasUserRentedBike) {
        user.rentedBikeId = markedBike.options.bike.id;
        rentBikeHttpReqAndMarkerUpdate(user);
    } else {
        alert("You already rented a bicycle! Please park it down and rent a new one later!");
    }
}

function returnBike() {
    if (markedBike != null && hasUserRentedBike) {
        user.rentedBikeId = markedBike.options.bike.id;
        returnBikeHttpReqAndMarkerUpdate(user);
    }
}

function rentBikeHttpReqAndMarkerUpdate(user) {
    if (!hasUserRentedBike) {
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:8080/BikeRental/api/bikes/rent";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", authKey);
        xhr.send(JSON.stringify(user));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 2 && xhr.status === 200) {
                console.log("User " + user.email + " has rented bicycle number : " + user.rentedBikeId);
                hasUserRentedBike = true;

                var status = new L.icon({
                    iconUrl: 'https://cdn4.iconfinder.com/data/icons/miu/24/map-location-pin-map-marker-glyph-128.png',
                    iconSize: [25, 45]
                });
                markedBike.setIcon(status);

                var content = "<div align='center' class='inline'><i class='fa fa-bicycle fa-2x'></i><p>" + markedBike.options.bike.name + "</p></div>";
                content = content.concat("<div>You rent this bike!</div>&nbsp;");
                content = content.concat("<div align='center'></div><button type='button' class='btn btn-primary' onclick='returnBike()'>Return Bicycle</button>&nbsp;</div>");
                markedBike.getPopup().setContent(content);
                markedBike.getPopup().update();

            }
        }
    }
}

function returnBikeHttpReqAndMarkerUpdate(user) {
    if (user.rentedBikeId > -1) {
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:8080/BikeRental/api/bikes/leave";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", authKey);
        xhr.send(JSON.stringify(user));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 2 && xhr.status === 200) {
                console.log("User " + user.email + " has returned bicycle number : " + user.rentedBikeId);
                user.rentedBikeId = -1;
                hasUserRentedBike = false;
                var statusIcon = new L.icon({
                    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png',
                    iconSize: [25, 45],
                });
                markedBike.setIcon(statusIcon);
                var content = "<div align='center' class='inline'><i class='fa fa-bicycle fa-2x'></i><p>" + markedBike.options.bike.name + "</p></div>";
                var markerBikeInstructions = "<ol><li>Click on 'Rent Bicycle'</li><li>Bicycle lock will unlock automatically</li><li>Adjust saddle height</li>&nbsp;</ol>";
                var rentAvailableBikeButtonHtml = "<div align='center'><button type='button' class='btn btn-primary' onclick='rentBike()'>Rent Bike</button></div>&nbsp;";

                content = content.concat(markerBikeInstructions).concat(rentAvailableBikeButtonHtml);
                markedBike.getPopup().setContent(content);
                markedBike.getPopup().update();
            }
        }
    }
}