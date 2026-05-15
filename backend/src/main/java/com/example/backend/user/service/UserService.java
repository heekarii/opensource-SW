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

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public SignupResponse signup(SignupRequest request) {
        validateDuplicateUser(request);

        String encodedPassword = passwordEncoder.encode(request.password());
        User user = User.create(request.email(), encodedPassword, request.nickname(), request.profileImageUrl());
        User savedUser = userRepository.save(user);

        return SignupResponse.from(savedUser);
    }

    private void validateDuplicateUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        if (userRepository.existsByNickname(request.nickname())) {
            throw new DuplicateResourceException("Nickname already exists.");
        }
    }
}
