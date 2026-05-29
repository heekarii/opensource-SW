package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ReviewRequest;
import com.example.backend.dto.ReviewWithRestaurantRequest;
import com.example.backend.entity.Restaurant;
import com.example.backend.entity.Review;
import com.example.backend.repository.ReviewRepository;
import com.example.backend.user.domain.User;
import com.example.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * 리뷰 관련 API 요청을 처리하는 컨트롤러 클래스입니다.
 */
@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    /**
     * 특정 식당의 리뷰 목록을 조회합니다.
     * 
     * @param restaurantId 리뷰를 조회할 식당의 식별자
     * @return 해당 식당에 작성된 리뷰 목록
     */
    @GetMapping("/{restaurantId}")
    public List<Review> getReviews(@PathVariable Long restaurantId) {
        return reviewRepository.findByRestaurantId(restaurantId);
    }

    /**
     * 특정 식당에 새로운 리뷰를 생성합니다.
     * 
     * @param restaurantId 리뷰를 작성할 식당의 식별자
     * @param request 생성할 리뷰 정보 (프론트엔드 JSON 요청 본문)
     * @return 저장된 리뷰 객체
     */
    @PostMapping("/{restaurantId}")
    public Review createReview(
            @PathVariable Long restaurantId,
            @RequestBody ReviewRequest request
    ) {
        // 식당 객체를 생성하고 식별자를 설정합니다.
        Restaurant restaurant = new Restaurant();
        restaurant.setId(restaurantId);

        // 프론트엔드에서 전달받은 데이터를 바탕으로 리뷰 객체를 생성합니다.
        Review review = new Review();
        review.setRestaurant(restaurant);
        review.setContent(request.content());
        review.setTasteScore(request.tasteScore());
        review.setPriceScore(request.priceScore());
        review.setServiceScore(request.serviceScore());
        review.setImageUrl(request.imageUrl());

        // [버그 픽스] 전달받은 userId로 DB에서 실제 User 엔티티를 조회하여 리뷰에 완벽하게 연결합니다.
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
        review.setUser(user);

        // 리뷰를 데이터베이스에 저장하고 반환합니다.
        return reviewRepository.save(review);
    }

    /**
     * 식당 아이디와 유저 아이디를 모두 Body(JSON)로 받아서 새로운 리뷰를 생성합니다.
     * 프론트엔드의 편의를 위해 추가된 대안(Alternative) API입니다.
     * URL: POST /reviews
     * 
     * @param request 생성할 리뷰 정보 (식당ID, 유저ID 모두 포함)
     * @return 저장된 리뷰 객체
     */
    @PostMapping
    public Review createReviewWithBody(
            @RequestBody ReviewWithRestaurantRequest request
    ) {
        // 식당 객체를 생성하고 식별자를 설정합니다.
        Restaurant restaurant = new Restaurant();
        restaurant.setId(request.restaurantId());

        // 프론트엔드에서 전달받은 데이터를 바탕으로 리뷰 객체를 생성합니다.
        Review review = new Review();
        review.setRestaurant(restaurant);
        review.setContent(request.content());
        review.setTasteScore(request.tasteScore());
        review.setPriceScore(request.priceScore());
        review.setServiceScore(request.serviceScore());
        review.setImageUrl(request.imageUrl());

        // 전달받은 userId로 DB에서 실제 User 엔티티를 조회하여 리뷰에 완벽하게 연결합니다.
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));
        review.setUser(user);

        // 리뷰를 데이터베이스에 저장하고 반환합니다.
        return reviewRepository.save(review);
    }

    /**
     * 기존 리뷰를 수정합니다.
     * 
     * @param id 수정할 리뷰의 식별자
     * @param userId 수정을 요청하는 유저의 식별자
     * @param updatedReview 수정할 리뷰 내용 (JSON 요청 본문)
     * @return 수정 완료된 리뷰 객체
     */
    @PutMapping("/{id}")
    public Review updateReview(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestBody Review updatedReview
    ) {
        // 기존 리뷰를 데이터베이스에서 조회하며, 없을 경우 예외를 발생시킵니다.
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 리뷰입니다."));

        // 작성자 권한 검증: 요청한 유저가 실제 리뷰 작성자인지 확인합니다.
        if (!review.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("본인이 작성한 리뷰만 수정할 수 있습니다.");
        }

        // 리뷰 내용을 업데이트합니다.
        review.setTasteScore(updatedReview.getTasteScore());
        review.setPriceScore(updatedReview.getPriceScore());
        review.setServiceScore(updatedReview.getServiceScore());
        review.setContent(updatedReview.getContent());
        review.setImageUrl(updatedReview.getImageUrl());

        // 수정된 리뷰를 데이터베이스에 저장하고 반환합니다.
        return reviewRepository.save(review);
    }

    /**
     * 특정 리뷰를 삭제합니다.
     * 
     * @param id 삭제할 리뷰의 식별자
     * @param userId 삭제를 요청하는 유저의 식별자
     * @return 삭제 완료 메시지
     */
    @DeleteMapping("/{id}")
    public String deleteReview(
            @PathVariable Long id,
            @RequestParam Long userId
    ) {
        // 기존 리뷰를 데이터베이스에서 조회합니다.
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 리뷰입니다."));

        // 작성자 권한 검증: 요청한 유저가 실제 리뷰 작성자인지 확인합니다.
        if (!review.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("본인이 작성한 리뷰만 삭제할 수 있습니다.");
        }

        // 해당 리뷰를 데이터베이스에서 삭제합니다.
        reviewRepository.delete(review);
        return "Review deleted successfully";
    }
}