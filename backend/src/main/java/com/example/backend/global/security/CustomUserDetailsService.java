package com.example.backend.global.security;

import com.example.backend.user.domain.User;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 스프링 시큐리티가 DB에서 사용자 정보를 가져올 때 사용하는 서비스입니다.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * DB에서 이메일(아이디 역할)로 사용자를 찾아 반환합니다.
     * 
     * @param username 찾고자 하는 이메일 (스프링 시큐리티 기본 파라미터명)
     * @return 사용자 정보를 담은 CustomUserDetails
     * @throws UsernameNotFoundException 사용자가 없을 때 발생
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
                
        return new CustomUserDetails(user);
    }
}
