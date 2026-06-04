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

        @Schema(description = "맛 별점 (1~5)", example = "5")
        @NotNull(message = "tasteScore is required.")
        @Min(1) @Max(5)
        Integer tasteScore,

        @Schema(description = "가성비 별점 (1~5)", example = "4")
        @NotNull(message = "priceScore is required.")
        @Min(1) @Max(5)
        Integer priceScore,

        @Schema(description = "서비스/친절도 별점 (1~5)", example = "5")
        @NotNull(message = "serviceScore is required.")
        @Min(1) @Max(5)
        Integer serviceScore,

        @Schema(description = "리뷰 내용", example = "너무 맛있어요! 강력 추천합니다.")
        @NotBlank(message = "content is required.")
        String content,
        
        @Schema(description = "리뷰 이미지 URL", example = "https://example.com/image.jpg")
        String imageUrl
) {
}
