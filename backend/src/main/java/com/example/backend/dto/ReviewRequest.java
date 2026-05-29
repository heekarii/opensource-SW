package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "리뷰 작성 요청 데이터")
public record ReviewRequest(

        @Schema(description = "작성자 유저 ID", example = "1")
        @NotNull(message = "userId is required.")
        Long userId,

        @Schema(description = "별점 (1~5)", example = "5")
        @NotNull(message = "rating is required.")
        @Min(1)
        @Max(5)
        Integer rating,

        @Schema(description = "리뷰 내용", example = "너무 맛있어요! 강력 추천합니다.")
        @NotBlank(message = "content is required.")
        String content
) {
}
