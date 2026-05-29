package com.example.backend.dto;

import com.example.backend.entity.Restaurant;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 클라이언트에게 반환되는 식당 정보 응답 DTO 클래스입니다.
 */
@Getter
@AllArgsConstructor
public class RestaurantResponse {

    private Long id;                // 식당 고유 식별자
    private String name;            // 식당 이름
    private String category;        // 식당 카테고리 이름
    private String address;         // 식당 주소
    private String phone;           // 식당 전화번호
    private String description;     // 식당 설명
    private Double latitude;        // 식당 위도
    private Double longitude;       // 식당 경도
    private String openingHours;    // 영업 시간
    private String imageUrl;        // 식당 이미지 URL
    private Double averageRating;   // 식당 평균 평점
    private Long reviewCount;       // 식당 리뷰 개수

    /**
     * Restaurant 엔티티와 추가 정보를 사용하여 RestaurantResponse 객체를 생성합니다.
     * 
     * @param restaurant Restaurant 엔티티
     * @param averageRating 평균 평점
     * @param reviewCount 리뷰 개수
     * @return 생성된 RestaurantResponse 객체
     */
    public static RestaurantResponse from(
            Restaurant restaurant,
            Double averageRating,
            Long reviewCount
    ) {
        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getCategory() != null ? restaurant.getCategory().getName() : null,
                restaurant.getAddress(),
                restaurant.getPhone(),
                restaurant.getDescription(),
                restaurant.getLatitude(),
                restaurant.getLongitude(),
                restaurant.getOpeningHours(),
                restaurant.getImageUrl(),
                averageRating == null ? 0.0 : averageRating,
                reviewCount
        );
    }
}