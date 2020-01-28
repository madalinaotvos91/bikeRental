package com.bike.rental.model;


import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "bikes")
public class Bike implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Email", nullable = false)
    private String email;

    @NotEmpty
    @Column(name = "Latitude", nullable = false)
    private Double latitude;

    @NotEmpty
    @Column(name = "Longitude", nullable = false)
    private Double longitude;

    @Column(name = "Rented", nullable = false)
    private Boolean rented;


    /**
     * Equals function that compares if the bike id and bike name are equal in case of two object comparison.
     *
     * @param o
     * @return
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Bike bike = (Bike) o;
        return id != null ? !id.equals(bike.id) && email.equals(bike.email) : bike.id != null;
    }

    /**
     * HashCode function for hashing algorithm of object uniqueness and consistency.
     *
     * @return int code
     */
    @Override
    public int hashCode() {
        int result;
        long temp;
        result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0) + (latitude != null ? latitude.hashCode() : 0);
        temp = Double.doubleToLongBits(longitude);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * toString function for object String serialization.
     *
     * @return String representation of Bike object
     */
    @Override
    public String toString() {
        return "Bike [id=" + id + ", name=" + name + ", latitude= " + ", email= " + email
                + ", latitude=" + latitude + ", longitude=" + longitude + ", rented=" + rented + "]";
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public void setRented(Boolean rented) {
        this.rented = rented;
    }

    public Long getId() {

        return id;
    }

    public String getName() {
        return name;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Boolean getRented() {
        return rented;
    }
}