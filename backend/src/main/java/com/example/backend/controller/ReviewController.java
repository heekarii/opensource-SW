package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.ReviewRequest;
import com.example.backend.entity.Restaurant;
import com.example.backend.entity.Review;
import com.example.backend.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

/**
 * 리뷰 관련 API 요청을 처리하는 컨트롤러 클래스입니다.
 */
@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;

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
        review.setRating(request.rating());

        // 리뷰를 데이터베이스에 저장하고 반환합니다.
        return reviewRepository.save(review);
    }

    /**
     * 기존 리뷰를 수정합니다.
     * 
     * @param id 수정할 리뷰의 식별자
     * @param updatedReview 수정할 리뷰 내용 (JSON 요청 본문)
     * @return 수정 완료된 리뷰 객체
     */
    @PutMapping("/{id}")
    public Review updateReview(
            @PathVariable Long id,
            @RequestBody Review updatedReview
    ) {
        // 기존 리뷰를 데이터베이스에서 조회하며, 없을 경우 예외를 발생시킵니다.
        Review review = reviewRepository.findById(id)
                .orElseThrow();

        // 리뷰 내용을 업데이트합니다.
        // userName은 더 이상 사용하지 않으므로 업데이트 항목에서 제외합니다.
        review.setRating(updatedReview.getRating());
        review.setContent(updatedReview.getContent());

        // 수정된 리뷰를 데이터베이스에 저장하고 반환합니다.
        return reviewRepository.save(review);
    }

    /**
     * 특정 리뷰를 삭제합니다.
     * 
     * @param id 삭제할 리뷰의 식별자
     * @return 삭제 완료 메시지
     */
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        // 해당 식별자의 리뷰를 데이터베이스에서 삭제합니다.
        reviewRepository.deleteById(id);
        return "Review deleted successfully";
    }
}