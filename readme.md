# Sportify : A Sports E-Commerce Website (Java + React)

A full-stack sports e-commerce web application built with **Java Spring Boot** and **React**. It features secure user authentication, product browsing, cart management, and a responsive UI — designed with modern best practices in mind.

---

## Features
- User login & registration (JWT-based)
- Product listing and filtering
- Add to cart, update quantity, remove items
- Order summary & checkout page
- Role-based access (Admin/User)
- RESTful API integration
- Dockerized MySQL and Redis support

---

## Tech Stack
**Frontend**: React, Redux, Material UI  
**Backend**: Java 21, Spring Boot 3, Spring Security, JPA, MySQL, Redis  
**Tools**: Docker, JWT, Axios, Styled Components

---

## 📦 Setup Instructions

```bash
# Start MySQL & Redis using Docker
docker-compose up -d
# Run Backend
cd backend
mvn install
mvnw spring-boot:run
# Run Frontend
cd frontend
npm install
npm start

Note : Create .env file and setup MySql Database Connection
```
---

## Author
- Jai Anand

