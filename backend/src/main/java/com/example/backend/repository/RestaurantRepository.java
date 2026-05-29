package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.Restaurant;

// 데이터베이스에서 식당(Restaurant) 데이터를 가져오고 저장하는 인터페이스입니다.
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    // 리뷰 많은 순 정렬
    @Query("""
        SELECT r
        FROM Restaurant r
        LEFT JOIN Review v ON v.restaurant = r
        GROUP BY r.id
        ORDER BY COUNT(v.id) DESC
    """)
    List<Restaurant> findAllOrderByReviewCountDesc();

    // 평균 별점 높은 순 정렬
    @Query("""
        SELECT r
        FROM Restaurant r
        LEFT JOIN Review v ON v.restaurant = r
        GROUP BY r.id
        ORDER BY AVG(v.rating) DESC
    """)
    List<Restaurant> findAllOrderByAverageRatingDesc();
    
    // 1. 식당 이름으로 검색 (대소문자 구분 없이, 부분 일치, 한글 지원)
    List<Restaurant> findByNameContainingIgnoreCase(String keyword);

    // 2. 카테고리 이름으로 검색
    List<Restaurant> findByCategoryName(String categoryName);

    // 3. 식당 이름과 카테고리 이름으로 동시 검색
    List<Restaurant> findByNameContainingIgnoreCaseAndCategoryName(String keyword, String categoryName);

    // 4. 특정 메뉴 이름이 포함된 식당 검색 
    // (JOIN을 사용하여 Menu 엔티티의 name 필드를 검색하고, 중복된 식당은 DISTINCT로 제거합니다.)
    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT r FROM Restaurant r, Menu m WHERE m.restaurant = r AND LOWER(m.name) LIKE LOWER(CONCAT('%', :menuName, '%'))")
    List<Restaurant> findByMenuNameContainingIgnoreCase(@org.springframework.data.repository.query.Param("menuName") String menuName);
}