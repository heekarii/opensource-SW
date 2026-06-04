package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.example.backend.entity.Category;
import com.example.backend.entity.Restaurant;
import com.example.backend.dto.RestaurantCreateRequest;
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

        if ("taste".equals(sort)) {
            return restaurantRepository.findAllOrderByTasteScoreDesc()
                    .stream()
                    .map(restaurant -> RestaurantResponse.from(
                            restaurant,
                            reviewRepository.getAverageRating(restaurant.getId()),
                            reviewRepository.countByRestaurantId(restaurant.getId())
                    ))
                    .toList();
        }

        if ("price".equals(sort)) {
            return restaurantRepository.findAllOrderByPriceScoreDesc()
                    .stream()
                    .map(restaurant -> RestaurantResponse.from(
                            restaurant,
                            reviewRepository.getAverageRating(restaurant.getId()),
                            reviewRepository.countByRestaurantId(restaurant.getId())
                    ))
                    .toList();
        }

        if ("service".equals(sort)) {
            return restaurantRepository.findAllOrderByServiceScoreDesc()
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

    /**
     * 새로운 식당을 등록합니다.
     * 
     * @param request 식당 등록에 필요한 데이터 (값 검증 적용됨)
     * @return 등록 완료된 식당 엔티티
     */
    @PostMapping
    public Restaurant createRestaurant(@Valid @RequestBody RestaurantCreateRequest request) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.name());
        
        // 카테고리 ID를 이용해 Category 엔티티 연관관계 설정
        Category category = new Category();
        category.setCategoryId(request.categoryId());
        restaurant.setCategory(category);
        
        restaurant.setAddress(request.address());
        restaurant.setPhone(request.phone());
        restaurant.setDescription(request.description());
        restaurant.setLatitude(request.latitude());
        restaurant.setLongitude(request.longitude());
        restaurant.setOpeningHours(request.openingHours());
        restaurant.setImageUrl(request.imageUrl());

        return restaurantRepository.save(restaurant);
    }
}