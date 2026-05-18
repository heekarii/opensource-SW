package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Favorite;

// Favorite 테이블에 접근하는 Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    // 특정 사용자의 찜 목록 조회
    List<Favorite> findByUserId(Long userId);

    // 특정 사용자가 특정 식당을 찜했는지 조회
    Optional<Favorite> findByUserIdAndRestaurantId(
            Long userId,
            Long restaurantId
    );

    // 특정 사용자의 특정 찜 삭제
    void deleteByUserIdAndRestaurantId(
            Long userId,
            Long restaurantId
    );
}