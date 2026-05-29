package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 스프링 부트 애플리케이션의 메인 클래스입니다.
 */
@SpringBootApplication
public class BackendApplication {

    /**
     * 애플리케이션의 진입점입니다.
     * 
     * @param args 커맨드 라인 인수
     */
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
