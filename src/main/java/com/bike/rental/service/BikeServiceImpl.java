package com.bike.rental.service;

import com.bike.rental.model.Bike;
import com.bike.rental.repository.BikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("bikeService")
@Transactional
public class BikeServiceImpl implements BikeService {
    @Autowired
    private BikeRepository bikeRepository;

    @Override
    public List<Bike> findAllBikes() {
        return bikeRepository.findAll();
    }

    @Override
    public List<Bike> findAvailableBikes() {
        return bikeRepository.findByRentedFalse();
    }

    @Override
    public Bike findBikeById(Long id) {
        return bikeRepository.findBikeById(id);
    }

    @Override
    public Bike updateRented(Long id, Boolean status, String email) {
        Bike bike = bikeRepository.findBikeById(id);
        if (bike != null) {
            bikeRepository.updateRentedBike(id, status, email);
            return bikeRepository.findBikeById(id);
        } else {
            return null;
        }
    }
}
