package entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Long restaurantId;

    @Column(name = "category_id")
    private Long categoryId;

    private String name;

    private String address;

    private String phone;

    private String description;

    private Double latitude;

    private Double longitude;

    @Column(name = "opening_hours")
    private String openingHours;

    @Column(name = "image_url")
    private String imageUrl;
}