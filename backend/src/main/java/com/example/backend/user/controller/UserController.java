package com.example.backend.user.controller;

import com.example.backend.user.dto.SignupRequest;
import com.example.backend.user.dto.SignupResponse;
import com.example.backend.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 사용자 관련 API 요청을 처리하는 컨트롤러 클래스입니다.
 */
@Tag(name = "Users", description = "회원 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    /**
     * 신규 회원 가입을 처리합니다.
     * 
     * @param request 회원가입 요청 데이터 (이메일, 비밀번호, 닉네임 등)
     * @return 생성된 회원의 정보와 응답 상태
     */
    @Operation(summary = "회원가입", description = "이메일, 비밀번호, 닉네임으로 신규 회원을 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "회원가입 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "요청값 검증 실패",
                    content = @Content(schema = @Schema(implementation = ProblemDetail.class))
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "이메일 또는 닉네임 중복",
                    content = @Content(schema = @Schema(implementation = ProblemDetail.class))
            )
    })
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        // 회원가입 비즈니스 로직을 수행합니다.
        SignupResponse response = userService.signup(request);

        // 생성됨(201) 상태 코드와 함께 결과를 반환합니다.
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
