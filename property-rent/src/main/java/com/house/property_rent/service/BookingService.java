package com.house.property_rent.service;

import com.house.property_rent.model.Booking;
import com.house.property_rent.model.Property;
import com.house.property_rent.model.User;
import com.house.property_rent.repository.BookingRepository;
import com.house.property_rent.repository.PropertyRepository;
import com.house.property_rent.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    public String bookProperty(Long userId, Long propertyId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("Error: User not found!"));
            Property property = propertyRepository.findById(propertyId)
                    .orElseThrow(() -> new IllegalArgumentException("Error: Property not found!"));
    
            if (!property.isAvailabilityStatus()) {
                throw new IllegalArgumentException("Error: Property not available!");
            }
    
            if (user.getWalletBalance() < property.getRentAmount()) {
                throw new IllegalArgumentException("Error: Insufficient wallet balance!");
            }
    
            // Deduct rent amount from user's wallet and update property status
            user.setWalletBalance(user.getWalletBalance() - property.getRentAmount());
            property.setAvailabilityStatus(false);
    
            Booking booking = new Booking();
            booking.setUser(user);
            booking.setProperty(property);
            booking.setBookingDate(new Date());
            booking.setAmountPaid(property.getRentAmount());
    
            bookingRepository.save(booking);
            userRepository.save(user);
            propertyRepository.save(property);
    
            return "Booking successful! Booking ID: " + booking.getBookingId();
        } catch (IllegalArgumentException e) {
            throw e; // Re-throw IllegalArgumentException to be handled in the controller
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("An unexpected error occurred during booking.");
        }
    }
    
    public List<Property> getBookedPropertiesByUser(Long userId) {
        return bookingRepository.findByUser_UserId(userId).stream()
                .map(Booking::getProperty)
                .toList();
    }
    
    
}
