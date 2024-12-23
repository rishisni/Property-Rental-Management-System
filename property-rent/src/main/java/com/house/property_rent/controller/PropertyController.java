package com.house.property_rent.controller;

import com.house.property_rent.model.Property;
import com.house.property_rent.model.User;
import com.house.property_rent.service.PropertyService;
import com.house.property_rent.service.UserService;
import com.house.property_rent.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:3000") // Ensure proper frontend connection
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ Add a new property
    @PostMapping("/add")
    public ResponseEntity<String> addProperty(@RequestHeader("Authorization") String token,
                                              @RequestBody Property property) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("Invalid token format.");
            }

            String jwtToken = token.substring(7); // Remove "Bearer " prefix
            String email = jwtUtil.extractEmail(jwtToken); // Extract email from token
            User user = userService.getUserDetails(email); // Fetch user details

            if (user == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
                return ResponseEntity.status(403).body("Error: Only admins can add properties.");
            }

            String response = propertyService.addProperty(property);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // ✅ Get all properties
    @GetMapping("/all")
    public ResponseEntity<List<Property>> getAllProperties() {
        try {
            List<Property> properties = propertyService.getAllProperties();
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // ✅ Get available properties
    @GetMapping("/available")
    public ResponseEntity<List<Property>> getAvailableProperties() {
        try {
            List<Property> properties = propertyService.getAvailableProperties();
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // ✅ Get property by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getPropertyById(@PathVariable Long id) {
        try {
            Property property = propertyService.getPropertyById(id);
            return ResponseEntity.ok(property);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
}




