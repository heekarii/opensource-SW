package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

// DB의 menu 테이블과 매핑되는 식당 메뉴 엔티티 클래스입니다.
@Getter
@Setter
@Entity
public class Menu {

    // 메뉴의 고유 식별자 (PK) - 자동 증가
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 메뉴 이름 (예: 얼큰 돼지국밥)
    private String name;
    
    // 메뉴 가격
    private Integer price;
    
    // 메뉴에 대한 설명
    private String description;

    // 다대일(N:1) 관계 설정 - 여러 메뉴가 하나의 식당(Restaurant)에 속함을 의미
    @ManyToOne
    @JoinColumn(name = "restaurant_id") // DB의 restaurant_id 컬럼과 연결
    private Restaurant restaurant;
}
