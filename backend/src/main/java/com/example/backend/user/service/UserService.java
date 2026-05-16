package com.example.backend.user.service;

import com.example.backend.global.exception.DuplicateResourceException;
import com.example.backend.user.domain.User;
import com.example.backend.user.dto.SignupRequest;
import com.example.backend.user.dto.SignupResponse;
import com.example.backend.user.repository.UserRepository;
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
