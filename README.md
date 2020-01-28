# Bike rental Spring Boot app 

Properties: 

In memory H2 database for database init

Spring boot REST API endpoints for registering, login in, retrieving and modifying Bike and User object

The app uses JWT web token, public endpoints /api/token, and /api/register

For the other endpoints like /api/users/details, /api/bikes, /api/bikes/rent, /api/bikes/leave etc... The Authorization Header has to be 
set to a valid JWT web token received through /api/token route, used for log in.

To execute the app make sure you have: 
1. Java version 8
2. Maven 

In command line execute:
1. mvn clean install
2. mvn spring-boot:run
The app is will be available on http://localhost:8080/BikeRental
