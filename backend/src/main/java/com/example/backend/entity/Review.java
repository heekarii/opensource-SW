package com.example.backend.entity;

import com.example.backend.user.domain.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 
     * [Legacy] 단순 문자열 형태의 작성자 이름.
     * 추후 제거될 예정입니다.
     */
    private String userName;

    /**
     * 리뷰를 작성한 유저(User) 엔티티와의 다대일(N:1) 연관관계 매핑입니다.
     */
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Integer rating;

    private String content;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;
}