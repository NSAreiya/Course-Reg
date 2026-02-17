package com.coursereg.service;

import com.coursereg.dto.AuthResponse;
import com.coursereg.dto.LoginRequest;
import com.coursereg.dto.SignupRequest;
import com.coursereg.exception.DuplicateResourceException;
import com.coursereg.model.User;
import com.coursereg.repository.UserRepository;
import com.coursereg.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(
                token,
                user.getUsername(),
                user.getRole().name(),
                "Login successful"
        );
    }

    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        try {
            user.setRole(User.Role.valueOf(request.getRole().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role. Must be ADMIN or STUDENT");
        }

        userRepository.save(user);

        return new AuthResponse(
                null,
                user.getUsername(),
                user.getRole().name(),
                "User registered successfully"
        );
    }

    public User getCurrentUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
