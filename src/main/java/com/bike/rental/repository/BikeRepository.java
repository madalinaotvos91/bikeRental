package com.bike.rental.repository;

import com.bike.rental.model.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface BikeRepository extends JpaRepository<Bike, Long> {
    List<Bike> findByRentedFalse();

    Bike findBikeById(Long id);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Bike b SET  b.email= :email, b.rented = :status WHERE b.id = :id")
    int updateRentedBike(@Param("id") Long id, @Param("status") Boolean status, @Param("email") String email);
}
