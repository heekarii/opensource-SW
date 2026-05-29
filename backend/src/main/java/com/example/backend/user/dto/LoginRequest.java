package com.example.backend.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "로그인 요청")
public record LoginRequest(

        @Schema(description = "이메일 (로그인 아이디)", example = "user@example.com")
        @NotBlank(message = "email is required.")
        String email,

        @Schema(description = "비밀번호", example = "password1234")
        @NotBlank(message = "password is required.")
        String password
) {
}
