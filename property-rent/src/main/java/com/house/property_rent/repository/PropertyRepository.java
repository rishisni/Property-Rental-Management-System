package com.house.property_rent.repository;

import com.house.property_rent.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    // Find all available properties
    List<Property> findByAvailabilityStatus(boolean availabilityStatus);
}

