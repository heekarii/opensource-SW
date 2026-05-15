package com.example.backend.dto;

import com.example.backend.entity.Restaurant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RestaurantResponse {

    private Long id;
    private String name;
    private String category;
    private String address;
    private Double latitude;
    private Double longitude;
    private Double averageRating;
    private Long reviewCount;

    public static RestaurantResponse from(
            Restaurant restaurant,
            Double averageRating,
            Long reviewCount
    ) {
        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getCategory(),
                restaurant.getAddress(),
                restaurant.getLatitude(),
                restaurant.getLongitude(),
                averageRating == null ? 0.0 : averageRating,
                reviewCount
        );
    }
}