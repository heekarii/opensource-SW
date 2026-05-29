package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Favorite;
import com.example.backend.repository.FavoriteRepository;

import lombok.RequiredArgsConstructor;

// REST API Controller
@RestController
@RequiredArgsConstructor
public class FavoriteController {

    // FavoriteRepository 자동 주입
    private final FavoriteRepository favoriteRepository;

    // 찜 추가 API
    @PostMapping("/favorites")
    public Favorite addFavorite(@RequestBody Favorite favorite) {

        // DB에 저장
        return favoriteRepository.save(favorite);
    }

    // 찜 삭제 API
    @DeleteMapping("/favorites")
    public String deleteFavorite(
            @RequestParam Long userId,
            @RequestParam Long restaurantId
    ) {

        // user_id + restaurant_id 기준 삭제
        favoriteRepository.deleteByUserIdAndRestaurantId(
                userId,
                restaurantId
        );

        return "찜 삭제 성공";
    }

    // 특정 사용자의 찜 목록 조회 API
    @GetMapping("/users/{userId}/favorites")
    public List<Favorite> getUserFavorites(
            @PathVariable Long userId
    ) {

        // 해당 사용자의 찜 목록 반환
        return favoriteRepository.findByUserId(userId);
    }


    @GetMapping("/favorites/check")
    public boolean checkFavorite(
        @RequestParam Long userId,
        @RequestParam Long restaurantId
) {

    return favoriteRepository
            .findByUserIdAndRestaurantId(userId, restaurantId)
            .isPresent();
}
}

