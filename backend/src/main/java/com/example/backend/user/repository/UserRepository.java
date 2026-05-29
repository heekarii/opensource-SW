package com.example.backend.user.repository;

import com.example.backend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 데이터베이스에서 사용자(User) 데이터를 가져오고 저장하는 인터페이스입니다.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 주어진 이메일을 가진 사용자가 존재하는지 확인합니다.
     * 
     * @param email 확인할 이메일
     * @return 존재 여부
     */
    boolean existsByEmail(String email);

    /**
     * 주어진 이메일로 사용자를 조회합니다.
     * 
     * @param email 조회할 이메일
     * @return 찾은 사용자 (Optional)
     */
    java.util.Optional<User> findByEmail(String email);

    /**
     * 주어진 닉네임을 가진 사용자가 존재하는지 확인합니다.
     * 
     * @param nickname 확인할 닉네임
     * @return 존재 여부
     */
    boolean existsByNickname(String nickname);
}
