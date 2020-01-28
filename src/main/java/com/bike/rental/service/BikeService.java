package com.bike.rental.service;

import com.bike.rental.model.Bike;

import java.util.List;

/**
 * Interface for Bike service methods.
 */
public interface BikeService {
    List<Bike> findAllBikes();

    List<Bike> findAvailableBikes();

    Bike findBikeById(Long id);

    Bike updateRented(Long id, Boolean status, String email);
}