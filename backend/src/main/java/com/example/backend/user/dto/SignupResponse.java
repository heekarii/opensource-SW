package com.example.backend.user.dto;

import com.example.backend.user.domain.User;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

/**
 * 회원가입 성공 시 클라이언트에게 반환하는 응답 데이터(DTO)입니다.
 */
@Schema(description = "회원가입 응답")
public record SignupResponse(

        @Schema(description = "사용자 ID", example = "1")
        Long userId,

        @Schema(description = "이메일", example = "user@example.com")
        String email,

        @Schema(description = "닉네임", example = "reviewer")
        String nickname,

        @Schema(description = "프로필 이미지 URL", example = "https://example.com/profile.png")
        String profileImageUrl,

        @Schema(description = "가입 일시")
        LocalDateTime createdAt
) {

    /**
     * User 엔티티를 SignupResponse DTO로 변환하는 정적 팩토리 메서드입니다.
     * 
     * @param user 변환할 사용자 엔티티
     * @return 변환된 SignupResponse 객체
     */
    public static SignupResponse from(User user) {
        return new SignupResponse(
                user.getUserId(),
                user.getEmail(),
                user.getNickname(),
                user.getProfileImageUrl(),
                user.getCreatedAt()
        );
    }
}
