package com.example.backend.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * 회원가입 시 클라이언트로부터 전달받는 요청 데이터(DTO)입니다.
 */
@Schema(description = "회원가입 요청")
public record SignupRequest(

        @Schema(description = "이메일 (로그인 아이디)", example = "user@example.com")
        @NotBlank(message = "email is required.")
        @Size(max = 100, message = "email must be 100 characters or less.")
        String email,

        @Schema(description = "비밀번호", example = "password1234")
        @NotBlank(message = "password is required.")
        @Size(min = 8, max = 100, message = "password must be between 8 and 100 characters.")
        String password,

        @Schema(description = "닉네임", example = "reviewer")
        @NotBlank(message = "nickname is required.")
        @Size(max = 50, message = "nickname must be 50 characters or less.")
        String nickname,

        @Schema(description = "프로필 이미지 URL", example = "https://example.com/profile.png")
        @Size(max = 255, message = "profileImageUrl must be 255 characters or less.")
        String profileImageUrl
) {
}
