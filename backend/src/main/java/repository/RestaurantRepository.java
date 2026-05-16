package repository;

import entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 예비 식당(Restaurant) 데이터를 처리하는 레포지토리 인터페이스입니다.
 */
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}