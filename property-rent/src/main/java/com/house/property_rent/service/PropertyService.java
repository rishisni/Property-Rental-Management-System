package com.house.property_rent.service;

import com.house.property_rent.model.Property;
import com.house.property_rent.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    // 🏠 Add a new property (Admin Only)
    public String addProperty(Property property) {
        propertyRepository.save(property);
        return "Property added successfully with ID: " + property.getPropertyId();
    }

    // 🏠 Get all properties
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // 🏠 Get available properties
    public List<Property> getAvailableProperties() {
        return propertyRepository.findByAvailabilityStatus(true);
    }

    // 🏠 Get property by ID
    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Property with ID " + id + " not found."));
    }

    // 🏠 Mark property as booked (Called from BookingService)
    public void markPropertyAsBooked(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Property with ID " + propertyId + " not found."));

        if (!property.isAvailabilityStatus()) {
            throw new IllegalArgumentException("Property is already booked.");
        }

        property.setAvailabilityStatus(false);
        propertyRepository.save(property);
    }
}

