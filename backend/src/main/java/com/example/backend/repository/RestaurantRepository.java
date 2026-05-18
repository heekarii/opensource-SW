package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backend.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    // 리뷰 많은 순 정렬
    @Query("""
        SELECT r
        FROM Restaurant r
        LEFT JOIN Review v ON v.restaurant = r
        GROUP BY r.id
        ORDER BY COUNT(v.id) DESC
    """)
    List<Restaurant> findAllOrderByReviewCountDesc();

    // 평균 별점 높은 순 정렬
    @Query("""
        SELECT r
        FROM Restaurant r
        LEFT JOIN Review v ON v.restaurant = r
        GROUP BY r.id
        ORDER BY AVG(v.rating) DESC
    """)
    List<Restaurant> findAllOrderByAverageRatingDesc();
}