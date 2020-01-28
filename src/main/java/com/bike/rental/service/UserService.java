package com.bike.rental.service;

import com.bike.rental.model.User;

import java.util.List;

public interface UserService {

    User save(User user);

    List<User> findAll();

    void deleteById(Long id);

    User findById(Long id);

    User findByEmail(String email);

    User updateRentedBike(User user);
}
