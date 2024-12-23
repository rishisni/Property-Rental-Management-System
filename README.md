# Property Management System

This is a **Property Management System** built with a Spring Boot backend and a React frontend. It allows users to manage properties, handle listings, and perform other related operations.

---

## Folder Structure

### 1. `property-rent` (Backend)
The backend is implemented using **Spring Boot** and provides the following functionalities:
- RESTful APIs for property management
- Database operations for CRUD (Create, Read, Update, Delete) functionalities
- Authentication and authorization
- Integration with external services if needed

### 2. `property-rent-frontend` (Frontend)
The frontend is built with **React.js** and provides the following functionalities:
- User-friendly interface for managing properties
- Integration with the backend APIs
- Features like filtering, searching, and listing properties

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- **Java Development Kit (JDK)** (for the backend)
- **Node.js** and **npm/yarn** (for the frontend)
- **MySQL/PostgreSQL** or any other supported database (for backend persistence)

---

### Setting up the Backend (`property-rent`)

1. **Navigate to the backend folder**:
   ```bash
   cd property-rent
2. **Build the backend:**:
    ```bash
   mvn clean install
3. **Run the backend:**:
    ```bash
   mvn spring-boot:run

### Setting up the Frontend (`property-rent-frontend`)

1. **Navigate to the frontend folder**:
    ```bash
   cd property-rent-frontend
    
2. **Build the frontend:**:
   ```bash
   npm install
   
3. **Run the frontend:**:
    ```bash
   npm start


   
