<!DOCTYPE html>

<html lang="en" ng-app="bikeRental">
<head>
    <title>Bike Rental</title>
    <link href="css/bootstrap.css" rel="stylesheet"/>
    <link href="css/app.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossorigin=""/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
            integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
            crossorigin=""></script>
    <script src="//code.angularjs.org/1.2.20/angular.js"></script>
    <script src="//unpkg.com/@uirouter/angularjs/release/angular-ui-router.min.js"></script>
    <script src="js/app.js"></script>

    <script src="js/services/loginService.js"></script>
    <script src="js/services/registrationService.js"></script>
    <script src="js/services/notificationService.js"></script>
    <script src="js/services/homeService.js"></script>
    <script src="js/services/userService.js"></script>
    <script src="js/controllers/registerController.js"></script>
    <script src="js/controllers/loginController.js"></script>
    <script src="js/controllers/homeController.js"></script>
</head>
<body>

<div class="jumbotron">
    <div class="container">
        <div class="col-sm-8 col-sm-offset-2">
            <div ui-view align="center"></div>
        </div>
    </div>
</div>
</body>
</html>