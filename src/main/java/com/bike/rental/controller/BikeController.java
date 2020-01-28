package com.bike.rental.controller;

import com.bike.rental.model.Bike;
import com.bike.rental.model.User;
import com.bike.rental.service.BikeService;
import com.bike.rental.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api")
/**
 * Bike REST controller to expose the API endpoints for Bike status actions.
 */
public class BikeController {
    public static final Logger logger = LoggerFactory.getLogger(BikeController.class);

    @Autowired
    BikeService bikeService;

    @Autowired
    UserService userService;

    /**
     * Retrieve all Bike entries from database.
     *
     * @return list of Bike entries
     */
    @RequestMapping(value = "/bikes", method = RequestMethod.GET)
    public ResponseEntity<List<Bike>> listAllBikes() {
        List<Bike> bikes = bikeService.findAllBikes();
        if (bikes.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bikes, HttpStatus.OK);
    }


    /**
     * Retrieve all available to rent, Bike entries from database.
     *
     * @return list of available Bike entries
     */
    @RequestMapping(value = "/bikes/available", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Bike>> listAvailableBikes() {
        List<Bike> bikes = bikeService.findAvailableBikes();
        if (bikes.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bikes, HttpStatus.OK);
    }

    /**
     * User endpoint for renting a bike which's id belongs to the User object.
     *
     * @return Bike with rented=true, updated email
     */
    @RequestMapping(value = "/bikes/rent", method = RequestMethod.POST)
    public ResponseEntity<Bike> updateBike(@RequestBody User user) {
        Bike bike = bikeService.updateRented(user.getRentedBikeId(), true, user.getEmail());
        if (bike == null) {
            return new ResponseEntity<>(bike, HttpStatus.CONFLICT);
        } else {
            User updatedUserBikeStatus = userService.updateRentedBike(user);
            logger.info("Bike {} is rented by user {}", updatedUserBikeStatus.getId(), updatedUserBikeStatus.getEmail());
            return new ResponseEntity<>(bike, HttpStatus.OK);
        }
    }

    /**
     * User endpoint for leaving a bike which's id belongs to the User object.
     *
     * @return Bike with rented=false and updated email empty, name Bike and user's rentedBikeId = 0L
     */
    @RequestMapping(value = "/bikes/leave", method = RequestMethod.POST)
    public ResponseEntity<Bike> leaveBike(@RequestBody User user) {
        Bike bike = bikeService.findBikeById(user.getRentedBikeId());

        if (bike == null) {
            return new ResponseEntity<>(bike, HttpStatus.NOT_FOUND);
        } else {
            bike = bikeService.updateRented(user.getRentedBikeId(), false, "");
            user.setRentedBikeId(-1L);
            userService.updateRentedBike(user);
            logger.info("Bike id {} left by user: {}.", user.getRentedBikeId(), user.getEmail());
            return new ResponseEntity<>(bike, HttpStatus.OK);
        }
    }
}
