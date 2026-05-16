package com.example.backend.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 애플리케이션 전역에서 발생하는 예외를 처리하는 컨트롤러 어드바이스 클래스입니다.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * DuplicateResourceException 예외를 처리합니다. (상태 코드 409 Conflict)
     * 
     * @param exception 발생한 예외
     * @return 에러 세부 정보를 포함한 응답
     */
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ProblemDetail> handleDuplicateResource(DuplicateResourceException exception) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, exception.getMessage());
        problemDetail.setTitle("Duplicate resource");

        return ResponseEntity.status(HttpStatus.CONFLICT).body(problemDetail);
    }

    /**
     * @Valid 또는 @Validated 검증 실패 시 발생하는 MethodArgumentNotValidException 예외를 처리합니다. (상태 코드 400 Bad Request)
     * 
     * @param exception 발생한 예외
     * @return 필드별 에러 메시지를 포함한 응답
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleValidation(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new LinkedHashMap<>();
        exception.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Invalid request body.");
        problemDetail.setTitle("Validation failed");
        problemDetail.setProperty("errors", errors);

        return ResponseEntity.badRequest().body(problemDetail);
    }
}
