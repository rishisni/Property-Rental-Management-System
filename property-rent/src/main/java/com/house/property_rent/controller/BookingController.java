package com.house.property_rent.controller;

import com.house.property_rent.model.Booking;
import com.house.property_rent.model.Property;

import com.house.property_rent.model.User;
import com.house.property_rent.service.BookingService;
import com.house.property_rent.service.UserService;
import com.house.property_rent.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    private ResponseEntity<?> validateAndExtractUser(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Missing or invalid token format!");
        }

        String jwtToken = token.substring(7).trim();

        if (!jwtUtil.isTokenValid(jwtToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid token!");
        }

        String email = jwtUtil.extractEmail(jwtToken);
        User user = userService.getUserDetails(email);

        if (user == null || !user.getRole().equalsIgnoreCase("USER")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Error: Only users can book properties.");
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/book/{propertyId}")
    public ResponseEntity<?> bookProperty(
        @RequestHeader(value = "Authorization", required = false) String token,
        @PathVariable Long propertyId
    ) {
        ResponseEntity<?> validationResponse = validateAndExtractUser(token);
    
        if (validationResponse.getStatusCode() != HttpStatus.OK) {
            return validationResponse;
        }
    
        User user = (User) validationResponse.getBody();
    
        try {
            String result = bookingService.bookProperty(user.getUserId(), propertyId);
            return ResponseEntity.ok(Map.of("success", true, "message", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "An unexpected error occurred. Please try again later."));
        }
    }
    

    @GetMapping("/user/properties")
public ResponseEntity<?> getBookedProperties(@RequestHeader("Authorization") String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing or invalid Authorization header");
    }

    try {
        String token = authHeader.substring(7);
        if (!jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        User user = userService.getUserDetails(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Use getUserId() to fetch the ID
        List<Property> bookedProperties = bookingService.getBookedPropertiesByUser(user.getUserId());

        return ResponseEntity.ok(bookedProperties);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
    }
}


}
