package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}