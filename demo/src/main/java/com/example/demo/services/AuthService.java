package com.example.demo.services;

import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;
import com.mongodb.DuplicateKeyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(User user) {
        try {
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                throw new RuntimeException("Email already in use!");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);

            return "User registered successfully!";
        } catch (DuplicateKeyException e) {
            throw new RuntimeException("Email already in use!"); // This handles duplicate email attempts
        }
    }

    public User loginUser(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found!"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid credentials!");
        }
        return user;
    }
}
