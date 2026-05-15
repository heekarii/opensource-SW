package com.example.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.Restaurant;
import com.example.backend.repository.RestaurantRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantRepository restaurantRepository;

    @GetMapping
    public List<Restaurant> getRestaurants() {
        return restaurantRepository.findAll();
    }
}