package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * URL 경로(Path) 없이, 오직 JSON Body만으로 
 * 유저 ID와 식당 ID를 동시에 받아서 리뷰를 생성하기 위한 DTO입니다.
 */
public record ReviewWithRestaurantRequest(
        @Schema(description = "리뷰 작성자 ID", example = "1")
        @NotNull(message = "userId is required.")
        Long userId,

        @Schema(description = "식당 ID", example = "1")
        @NotNull(message = "restaurantId is required.")
        Long restaurantId,

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
