package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.entity.Restaurant;

import com.example.backend.dto.RestaurantResponse;
import com.example.backend.repository.RestaurantRepository;
import com.example.backend.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantRepository restaurantRepository;
    private final ReviewRepository reviewRepository;

    @GetMapping
    public List<RestaurantResponse> getRestaurants(@RequestParam(required = false) String keyword) {
        List<Restaurant> restaurants;

        // 검색어가 전달된 경우 식당 이름으로 검색 (대소문자 구분 없음, 한글 포함)
        if (keyword != null && !keyword.trim().isEmpty()) {
            restaurants = restaurantRepository.findByNameContainingIgnoreCase(keyword);
        } else {
            // 검색어가 없는 경우 전체 식당 목록 반환
            restaurants = restaurantRepository.findAll();
        }

        return restaurants.stream()
                .map(restaurant -> RestaurantResponse.from(
                        restaurant,
                        reviewRepository.getAverageRating(restaurant.getId()),
                        reviewRepository.countByRestaurantId(restaurant.getId())
                ))
                .toList();
    }
}