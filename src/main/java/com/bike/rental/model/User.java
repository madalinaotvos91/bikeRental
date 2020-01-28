package com.bike.rental.model;


import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
/**
 * Definition of User entry fields. The object will be stored in Users database.
 */
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(name = "Name", nullable = false)
    private String name;

    @NotEmpty
    @Column(name = "Email", nullable = false)
    private String email;

    @Column(name = "Password")
    private String password;

    @Column(name = "rentedBikeId")
    private Long rentedBikeId;

    /**
     * Comparison of two User objects if the id is equal the object is the same, otherwise the name email pair are checked.
     *
     * @param o User object
     * @return True if the two objects are equal else false.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;
        return email.equals(user.email);
    }

    /**
     * Hash code encrypted by unique mail field
     *
     * @return
     */
    @Override
    public int hashCode() {
        int result;
        result = id != null ? id.hashCode() : 0;
        result = 31 * result + (email != null ? email.hashCode() : 0) + (email != null ? email.hashCode() : 0);
        result = 31 * result + (10 ^ (2 >>> 32));
        return result;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", email= "
                + email + ", rentedBikeId=" + getRentedBikeId() + "]";
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getRentedBikeId() {
        return rentedBikeId;
    }

    public void setRentedBikeId(Long rentedBikeId) {
        this.rentedBikeId = rentedBikeId;
    }

}