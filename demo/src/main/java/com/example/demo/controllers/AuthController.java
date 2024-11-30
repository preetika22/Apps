package com.example.demo.controllers;

import com.example.demo.models.LoginRequest;
import com.example.demo.models.User;
import com.example.demo.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = authService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(user); // Return user details on successful login
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage()); // Return error for invalid credentials
        }
    }

    @GetMapping("/generate-family-id")
    public ResponseEntity<?> generateFamilyId() {
        String familyId = UUID.randomUUID().toString();
        return ResponseEntity.ok(Map.of("familyId", familyId));
    }
}
