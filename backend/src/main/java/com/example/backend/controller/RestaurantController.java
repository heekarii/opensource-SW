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
    public List<RestaurantResponse> getRestaurants(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category) {
        
        List<Restaurant> restaurants;

        boolean hasKeyword = keyword != null && !keyword.trim().isEmpty();
        boolean hasCategory = category != null && !category.trim().isEmpty();

        if (hasKeyword && hasCategory) {
            // 이름과 카테고리 둘 다 검색
            restaurants = restaurantRepository.findByNameContainingIgnoreCaseAndCategory(keyword, category);
        } else if (hasKeyword) {
            // 이름으로만 검색
            restaurants = restaurantRepository.findByNameContainingIgnoreCase(keyword);
        } else if (hasCategory) {
            // 카테고리로만 검색
            restaurants = restaurantRepository.findByCategory(category);
        } else {
            // 둘 다 없으면 전체 반환
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