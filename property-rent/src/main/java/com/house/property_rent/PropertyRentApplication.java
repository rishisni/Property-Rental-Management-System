package com.house.property_rent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.house.property_rent")
public class PropertyRentApplication {
    public static void main(String[] args) {
        SpringApplication.run(PropertyRentApplication.class, args);
    }
}
