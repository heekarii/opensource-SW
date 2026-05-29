package com.example.backend.entity;

import com.example.backend.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

// favorites 테이블과 연결되는 Entity 클래스
@Entity
@Table(name = "favorites")
@Getter
@Setter
public class Favorite {

    // favorite_id 컬럼과 연결되는 기본키(PK)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long favoriteId;

    // 찜한 사용자 ID
    @Column(name = "user_id")
    private Long userId;

    // 찜한 식당 ID
    @Column(name = "restaurant_id")
    private Long restaurantId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}