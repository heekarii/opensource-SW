package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * 신규 식당 등록 요청을 담는 DTO입니다.
 */
@Schema(description = "식당 등록 요청 데이터")
public record RestaurantCreateRequest(

        @Schema(description = "식당 이름", example = "맛있는 식당")
        @NotBlank(message = "식당 이름은 필수입니다.")
        String name,

        @Schema(description = "카테고리 ID", example = "1")
        @NotNull(message = "카테고리 ID는 필수입니다.")
        Long categoryId,

        @Schema(description = "주소", example = "서울시 강남구 어딘가")
        @NotBlank(message = "주소는 필수입니다.")
        String address,

        @Schema(description = "전화번호", example = "02-123-4567")
        String phone,

        @Schema(description = "식당 설명", example = "정말 맛있는 곳입니다.")
        String description,

        @Schema(description = "위도", example = "37.123456")
        @NotNull(message = "위도(latitude)는 필수입니다.")
        Double latitude,

        @Schema(description = "경도", example = "127.123456")
        @NotNull(message = "경도(longitude)는 필수입니다.")
        Double longitude,

        @Schema(description = "영업 시간", example = "09:00 - 22:00")
        String openingHours,

        @Schema(description = "식당 대표 이미지 URL", example = "https://example.com/image.jpg")
        String imageUrl
) {
}
