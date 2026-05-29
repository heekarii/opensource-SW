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
        LEFT JOIN Review rv ON rv.restaurant = r
        GROUP BY r.id
        ORDER BY COUNT(rv.id) DESC
    """)
    List<Restaurant> findAllOrderByReviewCountDesc();

    // 맛 별점 평균 높은 순 정렬
    @Query("""
        SELECT r
        FROM Restaurant r
        LEFT JOIN Review rv ON rv.restaurant = r
        GROUP BY r.id
        ORDER BY AVG(rv.tasteScore) DESC
    """)
    List<Restaurant> findAllOrderByTasteScoreDesc();

    // 가성비 별점 평균 높은 순 정렬
    @Query("""
        SELECT r
        FROM Restaurant r
        LEFT JOIN Review rv ON rv.restaurant = r
        GROUP BY r.id
        ORDER BY AVG(rv.priceScore) DESC
    """)
    List<Restaurant> findAllOrderByPriceScoreDesc();

    // 서비스 별점 평균 높은 순 정렬
    @Query("""
        SELECT r
        FROM Restaurant r
        LEFT JOIN Review rv ON rv.restaurant = r
        GROUP BY r.id
        ORDER BY AVG(rv.serviceScore) DESC
    """)
    List<Restaurant> findAllOrderByServiceScoreDesc();

    // 맛/가성비/서비스 3개 별점의 평균 높은 순 정렬
    @Query("""
        SELECT r
        FROM Restaurant r
        LEFT JOIN Review rv ON rv.restaurant = r
        GROUP BY r.id
        ORDER BY AVG((rv.tasteScore + rv.priceScore + rv.serviceScore) / 3.0) DESC
    """)
    List<Restaurant> findAllOrderByAverageRatingDesc();
}