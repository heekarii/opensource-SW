package com.example.backend.user.service;

import com.example.backend.global.exception.DuplicateResourceException;
import com.example.backend.user.domain.User;
import com.example.backend.user.dto.LoginRequest;
import com.example.backend.user.dto.LoginResponse;
import com.example.backend.user.dto.SignupRequest;
import com.example.backend.user.dto.SignupResponse;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.global.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 사용자 관련 비즈니스 로직을 처리하는 서비스 클래스입니다.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * 회원가입을 처리합니다. 중복 확인 후 비밀번호를 암호화하여 저장합니다.
     * 
     * @param request 회원가입 요청 데이터
     * @return 가입된 회원 정보 응답 객체
     */
    @Transactional
    public SignupResponse signup(SignupRequest request) {
        validateDuplicateUser(request);

        String encodedPassword = passwordEncoder.encode(request.password());
        User user = User.create(request.email(), encodedPassword, request.nickname(), request.profileImageUrl());
        User savedUser = userRepository.save(user);

        return SignupResponse.from(savedUser);
    }

    /**
     * 로그인을 처리하고 JWT 토큰을 반환합니다.
     * 
     * @param request 로그인 요청 데이터
     * @return 발급된 JWT 토큰 및 사용자 정보
     */
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        String token = jwtUtil.createToken(user.getEmail());

        return new LoginResponse(
                user.getUserId(),
                user.getEmail(),
                user.getNickname(),
                token
        );
    }

    /**
     * 이메일과 닉네임의 중복 여부를 검증합니다.
     * 
     * @param request 회원가입 요청 데이터
     * @throws DuplicateResourceException 이메일 또는 닉네임이 이미 존재하는 경우 발생
     */
    private void validateDuplicateUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        if (userRepository.existsByNickname(request.nickname())) {
            throw new DuplicateResourceException("Nickname already exists.");
        }
    }
}
