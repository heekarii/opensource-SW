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

// 클라이언트(프론트엔드/사용자)의 요청을 받아 처리하는 식당 컨트롤러입니다.
@RestController
@RequestMapping("/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantRepository restaurantRepository;
    private final ReviewRepository reviewRepository;

    // GET /restaurants API를 처리합니다. (식당 목록 조회 및 검색 기능)
    @GetMapping
    public List<RestaurantResponse> getRestaurants(
            @RequestParam(required = false) String keyword,    // 식당 이름 검색어 (선택 사항)
            @RequestParam(required = false) String category,   // 카테고리 필터링 (선택 사항)
            @RequestParam(required = false) String menuName) { // 메뉴 이름 검색어 (선택 사항)
        
        List<Restaurant> restaurants;

        // 전달받은 파라미터가 비어있지 않은지(유효한지) 각각 확인합니다.
        boolean hasKeyword = keyword != null && !keyword.trim().isEmpty();
        boolean hasCategory = category != null && !category.trim().isEmpty();
        boolean hasMenu = menuName != null && !menuName.trim().isEmpty();

        // 상황에 맞게 알맞은 Repository 메서드를 호출하여 식당 목록을 가져옵니다.
        if (hasMenu) {
            // 1. 메뉴 이름으로 검색 (메뉴 검색이 우선되도록 처리)
            restaurants = restaurantRepository.findByMenuNameContainingIgnoreCase(menuName);
        } else if (hasKeyword && hasCategory) {
            // 2. 이름과 카테고리 둘 다 검색
            restaurants = restaurantRepository.findByNameContainingIgnoreCaseAndCategoryName(keyword, category);
        } else if (hasKeyword) {
            // 3. 이름으로만 검색
            restaurants = restaurantRepository.findByNameContainingIgnoreCase(keyword);
        } else if (hasCategory) {
            // 4. 카테고리로만 검색
            restaurants = restaurantRepository.findByCategoryName(category);
        } else {
            // 5. 검색 파라미터가 하나도 없으면 전체 식당 반환
            restaurants = restaurantRepository.findAll();
        }

        // 찾아온 Restaurant 엔티티 목록을 클라이언트에게 보낼 RestaurantResponse(DTO) 형태로 변환합니다.
        // 이때 리뷰 테이블(ReviewRepository)을 조회하여 평균 별점과 리뷰 개수도 함께 담아서 반환합니다.
        return restaurants.stream()
                .map(restaurant -> RestaurantResponse.from(
                        restaurant,
                        reviewRepository.getAverageRating(restaurant.getId()),
                        reviewRepository.countByRestaurantId(restaurant.getId())
                ))
                .toList();
    }
}