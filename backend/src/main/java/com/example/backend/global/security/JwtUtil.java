package com.example.backend.global.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT 생성 및 검증을 담당하는 유틸리티 클래스입니다.
 */
@Component
public class JwtUtil {

    private final SecretKey secretKey;
    // 24시간 만료 (밀리초)
    private final long expiration = 24 * 60 * 60 * 1000L;

    public JwtUtil(@Value("${jwt.secret:schoolProjectSecretKeyMustBeVeryLong32Bytes!!}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * 사용자의 이메일(로그인 아이디)을 기반으로 JWT 토큰을 생성합니다.
     * 
     * @param email 사용자 이메일
     * @return 생성된 JWT 문자열
     */
    public String createToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(secretKey)
                .compact();
    }

    /**
     * JWT 토큰에서 사용자 이메일을 추출합니다.
     * 
     * @param token JWT 토큰
     * @return 사용자 이메일
     */
    public String getUsernameFromToken(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * JWT 토큰이 유효한지 검증합니다.
     * 
     * @param token JWT 토큰
     * @return 유효한 경우 true, 만료되거나 잘못된 경우 false
     */
    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 토큰에서 Claims (페이로드) 정보를 추출합니다.
     */
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
