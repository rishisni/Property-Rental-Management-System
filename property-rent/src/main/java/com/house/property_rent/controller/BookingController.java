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
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/user/properties")
public ResponseEntity<?> getBookedProperties(
    @RequestHeader(value = "Authorization", required = false) String token
) {
    try {
        // Validate token
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Missing or invalid token!");
        }

        String jwtToken = token.substring(7).trim();
        if (!jwtUtil.isTokenValid(jwtToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid token!");
        }

        // Extract user details from token
        String email = jwtUtil.extractEmail(jwtToken);
        User user = userService.getUserDetails(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: User not found!");
        }

        // Fetch bookings for the user
        List<Property> bookedProperties = bookingService.getBookedPropertiesForUser(user.getUserId());
        if (bookedProperties.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No bookings found for this user.");
        }

        return ResponseEntity.ok(bookedProperties);
    } catch (Exception e) {
        e.printStackTrace(); // Log the exception for debugging
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching bookings.");
    }
}

}
