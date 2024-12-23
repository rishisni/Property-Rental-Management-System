package com.house.property_rent.controller;

import com.house.property_rent.model.User;
import com.house.property_rent.service.UserService;

// import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
  
    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Controller is working!");
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            String response = userService.registerUser(user);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> loginRequest) {
        try {
            if (!loginRequest.containsKey("email") || !loginRequest.containsKey("password")) {
                throw new IllegalArgumentException("Missing email or password in request body.");
            }
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");
            Map<String, Object> response = userService.loginUser(email, password);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/wallet/topup")
    public ResponseEntity<String> topUpWallet(@RequestBody Map<String, Object> topUpRequest) {
        try {
            if (!topUpRequest.containsKey("token") || !topUpRequest.containsKey("amount")) {
                throw new IllegalArgumentException("Missing token or amount in request body.");
            }
            String token = topUpRequest.get("token").toString();
            double amount = Double.parseDouble(topUpRequest.get("amount").toString());
            String response = userService.topUpWallet(token, amount);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Error: " + ex.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody Map<String, String> logoutRequest) {
        try {
            if (!logoutRequest.containsKey("token")) {
                throw new IllegalArgumentException("Missing token in request body.");
            }
            String token = logoutRequest.get("token");
            String response = userService.logout(token);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Error: " + ex.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid token format"));
            }

            String jwtToken = token.substring(7);
            if (!userService.isTokenValid(jwtToken)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid token"));
            }

            String email = userService.extractEmailFromToken(jwtToken);
            User user = userService.getUserDetails(email);
            
            return ResponseEntity.ok(user);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }
}