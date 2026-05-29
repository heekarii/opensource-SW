package com.example.backend.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "로그인 응답")
public record LoginResponse(

        @Schema(description = "사용자 ID", example = "1")
        Long userId,

        @Schema(description = "이메일 (로그인 아이디)", example = "user@example.com")
        String email,

        @Schema(description = "닉네임", example = "reviewer")
        String nickname,

        @Schema(description = "JWT Access Token", example = "eyJhbGciOiJIUzI1NiJ9...")
        String accessToken
) {
}
