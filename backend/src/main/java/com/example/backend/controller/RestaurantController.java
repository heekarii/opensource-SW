package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
            @RequestParam(required = false) String sort
    ) {
        if ("reviewCount".equals(sort)) {
            return restaurantRepository.findAllOrderByReviewCountDesc()
                    .stream()
                    .map(restaurant -> RestaurantResponse.from(
                            restaurant,
                            reviewRepository.getAverageRating(restaurant.getId()),
                            reviewRepository.countByRestaurantId(restaurant.getId())
                    ))
                    .toList();
        }

        if ("rating".equals(sort)) {
            return restaurantRepository.findAllOrderByAverageRatingDesc()
                    .stream()
                    .map(restaurant -> RestaurantResponse.from(
                            restaurant,
                            reviewRepository.getAverageRating(restaurant.getId()),
                            reviewRepository.countByRestaurantId(restaurant.getId())
                    ))
                    .toList();
        }

        return restaurantRepository.findAll()
                .stream()
                .map(restaurant -> RestaurantResponse.from(
                        restaurant,
                        reviewRepository.getAverageRating(restaurant.getId()),
                        reviewRepository.countByRestaurantId(restaurant.getId())
                ))
                .toList();
    }
}