package com.example.backend.user.dto;

import com.example.backend.user.domain.User;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

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
