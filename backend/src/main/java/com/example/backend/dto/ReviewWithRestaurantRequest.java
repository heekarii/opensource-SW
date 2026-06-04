package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * 특정 식당의 리뷰를 생성할 때 식당 ID와 유저 ID를 모두 포함하는 요청 DTO입니다.
 */
@Schema(description = "식당 ID를 포함한 리뷰 작성 요청 데이터")
public record ReviewWithRestaurantRequest(

        @Schema(description = "리뷰를 작성할 식당 ID", example = "1")
        @NotNull(message = "restaurantId는 필수입니다.")
        Long restaurantId,

        @Schema(description = "작성자 유저 ID", example = "1")
        @NotNull(message = "userId는 필수입니다.")
        Long userId,

        @Schema(description = "맛 별점 (1~5)", example = "5")
        @NotNull(message = "맛 별점(tasteScore)은 필수입니다.")
        @Min(value = 1, message = "별점은 최소 1점이어야 합니다.") 
        @Max(value = 5, message = "별점은 최대 5점이어야 합니다.")
        Integer tasteScore,

        @Schema(description = "가성비 별점 (1~5)", example = "4")
        @NotNull(message = "가성비 별점(priceScore)은 필수입니다.")
        @Min(value = 1, message = "별점은 최소 1점이어야 합니다.") 
        @Max(value = 5, message = "별점은 최대 5점이어야 합니다.")
        Integer priceScore,

        @Schema(description = "서비스/친절도 별점 (1~5)", example = "5")
        @NotNull(message = "서비스 별점(serviceScore)은 필수입니다.")
        @Min(value = 1, message = "별점은 최소 1점이어야 합니다.") 
        @Max(value = 5, message = "별점은 최대 5점이어야 합니다.")
        Integer serviceScore,

        @Schema(description = "리뷰 내용", example = "너무 맛있어요! 강력 추천합니다.")
        @NotBlank(message = "리뷰 내용(content)은 필수입니다.")
        String content,
        
        @Schema(description = "리뷰 이미지 URL", example = "https://example.com/image.jpg")
        String imageUrl
) {
}
