package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

/**
 * 찜(Favorite) 추가 시 클라이언트로부터 전달받는 요청 데이터를 담는 DTO입니다.
 */
@Schema(description = "찜 추가 요청 데이터")
public record FavoriteRequest(

        @Schema(description = "찜을 요청한 유저의 ID", example = "1")
        @NotNull(message = "userId는 필수입니다.")
        Long userId,

        @Schema(description = "찜 대상 식당의 ID", example = "10")
        @NotNull(message = "restaurantId는 필수입니다.")
        Long restaurantId
) {
}
