package com.coursereg.controller;

import com.coursereg.dto.AuthResponse;
import com.coursereg.dto.LoginRequest;
import com.coursereg.dto.SignupRequest;
import com.coursereg.model.User;
import com.coursereg.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        AuthResponse response = authService.signup(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        User user = authService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(user);
    }
}
