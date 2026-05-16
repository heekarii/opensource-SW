package com.example.backend.global.exception;

/**
 * 리소스 중복 시 발생하는 커스텀 예외 클래스입니다.
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
