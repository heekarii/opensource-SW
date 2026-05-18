package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserId(Long userId);

    Optional<Favorite> findByUserIdAndRestaurantId(
            Long userId,
            Long restaurantId
    );

    @Transactional
    void deleteByUserIdAndRestaurantId(
            Long userId,
            Long restaurantId
    );
}