package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByRestaurantId(Long restaurantId);

    List<Review> findByUserUserId(Long userId);

    Long countByRestaurantId(Long restaurantId);

    @Query("SELECT AVG((r.tasteScore + r.priceScore + r.serviceScore) / 3.0) FROM Review r WHERE r.restaurant.id = :restaurantId")
    Double getAverageRating(@Param("restaurantId") Long restaurantId);
}