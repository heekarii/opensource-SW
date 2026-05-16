package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

/**
 * 데이터베이스의 restaurant 테이블과 매핑되는 식당 엔티티 클래스입니다.
 */
@Getter
@Setter
@Entity
public class Restaurant {

    // 식당의 고유 식별자 (PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // 식당 이름
    private String category;    // 식당 카테고리 (예: 한식, 중식 등)
    private String address;     // 식당 주소
    private Double latitude;    // 식당 위치 위도
    private Double longitude;   // 식당 위치 경도
}