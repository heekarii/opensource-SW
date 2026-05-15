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

import com.example.backend.entity.Restaurant;
import com.example.backend.entity.Review;
import com.example.backend.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;

    @GetMapping("/{restaurantId}")
    public List<Review> getReviews(@PathVariable Long restaurantId) {
        return reviewRepository.findByRestaurantId(restaurantId);
    }

    @PostMapping("/{restaurantId}")
    public Review createReview(
            @PathVariable Long restaurantId,
            @RequestBody Review review
    ) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(restaurantId);

        review.setRestaurant(restaurant);

        return reviewRepository.save(review);
    }

    @PutMapping("/{id}")
    public Review updateReview(
            @PathVariable Long id,
            @RequestBody Review updatedReview
    ) {
        Review review = reviewRepository.findById(id)
                .orElseThrow();

        review.setUserName(updatedReview.getUserName());
        review.setRating(updatedReview.getRating());
        review.setContent(updatedReview.getContent());

        return reviewRepository.save(review);
    }

    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        reviewRepository.deleteById(id);
        return "Review deleted successfully";
    }
}