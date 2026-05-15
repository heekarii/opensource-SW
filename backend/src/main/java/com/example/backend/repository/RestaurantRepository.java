package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    // 식당 이름으로 검색 (대소문자 구분 없이, 부분 일치, 한글 지원)
    List<Restaurant> findByNameContainingIgnoreCase(String keyword);

    // 카테고리로 검색
    List<Restaurant> findByCategory(String category);

    // 식당 이름과 카테고리로 동시 검색
    List<Restaurant> findByNameContainingIgnoreCaseAndCategory(String keyword, String category);
}