package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import lombok.Setter;

/**
 * 데이터베이스의 restaurant 테이블과 매핑되는 식당 엔티티 클래스입니다.
 */
@Getter
@Setter
@Entity
@Table(name = "restaurants")
public class Restaurant {

    // 식당의 고유 식별자 (PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 100)
    private String name;        // 식당 이름

    @Column(nullable = false, length = 255)
    private String address;     // 식당 주소

    @Column(length = 30)
    private String phone;       // 전화번호

    @Column(columnDefinition = "TEXT")
    private String description; // 설명

    @Column(nullable = false)
    private Double latitude;    // 식당 위치 위도
    
    @Column(nullable = false)
    private Double longitude;   // 식당 위치 경도

    @Column(name = "opening_hours", length = 255)
    private String openingHours; // 영업 시간

    @Column(name = "image_url", length = 255)
    private String imageUrl;     // 식당 이미지 URL

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}