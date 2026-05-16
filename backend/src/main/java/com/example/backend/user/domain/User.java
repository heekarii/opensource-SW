package com.example.backend.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * 데이터베이스의 users 테이블과 매핑되는 사용자 엔티티 클래스입니다.
 */
@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, unique = true, length = 50)
    private String nickname;

    @Column(name = "profile_image_url", length = 255)
    private String profileImageUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    private User(String email, String password, String nickname, String profileImageUrl) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }

    /**
     * 새로운 사용자(User) 객체를 생성하는 팩토리 메서드입니다.
     * 
     * @param email 사용자 이메일
     * @param encodedPassword 암호화된 비밀번호
     * @param nickname 사용자 닉네임
     * @param profileImageUrl 프로필 이미지 URL
     * @return 생성된 사용자 객체
     */
    public static User create(String email, String encodedPassword, String nickname, String profileImageUrl) {
        return new User(email, encodedPassword, nickname, profileImageUrl);
    }
}
