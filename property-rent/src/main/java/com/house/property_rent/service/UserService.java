package com.house.property_rent.service;

import com.house.property_rent.model.User;
import com.house.property_rent.model.BlacklistedToken;
import com.house.property_rent.repository.UserRepository;
import com.house.property_rent.repository.BlacklistedTokenRepository;
import com.house.property_rent.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;
    
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokenRepository.existsByToken(token);
    }

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with this email already exists!");
        }

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        user.setVerified(true);
        userRepository.save(user);
        return "User registered successfully with ID: " + user.getUserId();
    }

    public Map<String, Object> loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User with this email does not exist!");
        }
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid password!");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful!");
        response.put("token", token);
        response.put("user", user);
        return response;
    }

    public boolean isTokenValid(String token) {
        return jwtUtil.isTokenValid(token); // Call JwtUtil's method to validate the token
    }

    public User getUserDetails(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return user;
    }

    public String extractEmailFromToken(String token) {
        return jwtUtil.extractEmail(token);
    }

    public String topUpWallet(String token, double amount) {
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found!");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Top-up amount must be greater than 0!");
        }
        user.setWalletBalance(user.getWalletBalance() + amount);
        userRepository.save(user);
        return "Wallet topped up successfully! New balance: " + user.getWalletBalance();
    }

    public String logout(String token) {
        if (blacklistedTokenRepository.existsByToken(token)) {
            throw new IllegalArgumentException("Token is already blacklisted.");
        }
        blacklistedTokenRepository.save(new BlacklistedToken(token));
        return "Logout successful.";
    }
}
