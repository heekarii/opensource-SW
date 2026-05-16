package com.example.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 스프링 시큐리티 및 보안 관련 설정을 담당하는 클래스입니다.
 */
@Configuration
public class SecurityConfig {

    /**
     * 비밀번호를 안전하게 암호화하기 위한 인코더를 빈으로 등록합니다.
     * 
     * @return BCryptPasswordEncoder 인스턴스
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
