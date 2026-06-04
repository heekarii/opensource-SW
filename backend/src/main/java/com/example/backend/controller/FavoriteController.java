package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.example.backend.dto.FavoriteRequest;
import com.example.backend.entity.Favorite;
import com.example.backend.repository.FavoriteRepository;

import lombok.RequiredArgsConstructor;

/**
 * 사용자의 식당 찜(Favorite) 기능 관련 API 요청을 처리하는 컨트롤러입니다.
 */
@RestController
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteRepository favoriteRepository;

    /**
     * 특정 식당을 사용자의 찜 목록에 추가합니다.
     * 
     * @param request 찜 추가에 필요한 유저 ID와 식당 ID (값 검증 적용됨)
     * @return DB에 저장된 찜(Favorite) 엔티티 객체
     */
    @PostMapping("/favorites")
    public Favorite addFavorite(@Valid @RequestBody FavoriteRequest request) {
        // 클라이언트로부터 전달받은 검증된 DTO 데이터를 기반으로 엔티티를 생성합니다.
        Favorite favorite = new Favorite();
        favorite.setUserId(request.userId());
        favorite.setRestaurantId(request.restaurantId());

        // DB에 저장하고 결과를 반환합니다.
        return favoriteRepository.save(favorite);
    }

    /**
     * 사용자의 찜 목록에서 특정 식당을 삭제(해제)합니다.
     * 
     * @param userId 찜 해제를 요청한 유저의 식별자
     * @param restaurantId 찜 해제할 식당의 식별자
     * @return 삭제 완료 메시지
     */
    @DeleteMapping("/favorites")
    public String deleteFavorite(
            @RequestParam Long userId,
            @RequestParam Long restaurantId
    ) {
        // user_id와 restaurant_id를 기준으로 해당 찜 내역을 찾아 삭제합니다.
        favoriteRepository.deleteByUserIdAndRestaurantId(userId, restaurantId);
        return "찜 삭제 성공";
    }

    /**
     * 특정 사용자가 찜한 모든 식당 목록을 조회합니다.
     * 
     * @param userId 조회할 유저의 식별자
     * @return 해당 사용자의 찜(Favorite) 목록
     */
    @GetMapping("/users/{userId}/favorites")
    public List<Favorite> getUserFavorites(@PathVariable Long userId) {
        // 해당 사용자의 찜 목록을 DB에서 조회하여 반환합니다.
        return favoriteRepository.findByUserId(userId);
    }

    /**
     * 특정 사용자가 특정 식당을 찜했는지 여부를 확인합니다.
     * 
     * @param userId 유저 식별자
     * @param restaurantId 식당 식별자
     * @return 찜 내역이 존재하면 true, 그렇지 않으면 false 반환
     */
    @GetMapping("/favorites/check")
    public boolean checkFavorite(
            @RequestParam Long userId,
            @RequestParam Long restaurantId
    ) {
        // 해당 유저와 식당 조합으로 찜 내역이 존재하는지 여부를 확인하여 boolean으로 반환합니다.
        return favoriteRepository
                .findByUserIdAndRestaurantId(userId, restaurantId)
                .isPresent();
    }
}
