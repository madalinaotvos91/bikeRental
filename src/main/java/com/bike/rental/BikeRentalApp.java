package com.bike.rental;

import com.bike.rental.configuration.JpaConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@Import(JpaConfiguration.class)
@SpringBootApplication(scanBasePackages = {"com.bike.rental"})

/**
 * Application that handles Bike entries stored in H2 in memory database repository
 * and accessing api endpoints to manage Bike rental actions: Rent a bike, Lock the bike.
 */
public class BikeRentalApp {

    public static void main(String[] args) {
        SpringApplication.run(BikeRentalApp.class, args);
    }
}