# 🐾 Smart Pet Care Application

> **Dev-of-a-Smart-Pet-Care-Appli-for-Health-Mgt-Appointments-and-Marketplace-Services**
> `Feb Batch 8 · 2026`

---

## 📌 Overview

The **Smart Pet Care Application** is a full-stack web platform that helps pet owners manage their pets' health, schedule veterinary appointments, and access marketplace services — all in one place.

It provides a centralized system to improve pet care through digital tracking, easy booking, and convenient product access.

---

## 🎯 Objectives

- 🐾 Simplify pet health management
- 📅 Provide seamless appointment booking
- 🛒 Offer a marketplace for pet products and services
- ⚙️ Build a scalable full-stack application using modern technologies

---

## 🚀 Features

### 🐶 Pet Health Management
- Create and manage pet profiles
- Maintain vaccination records
- Store medical history
- Health reminders and alerts

### 📅 Appointment Management
- Book appointments with veterinarians
- View available time slots
- Cancel or reschedule bookings
- Notifications for upcoming visits

### 🛒 Marketplace
- Browse pet products and services
- Add products to cart
- Place orders and view order history
- Ratings and reviews

### 👤 User Management
- User registration and login
- Secure authentication (JWT)
- Profile management

---

## 🏗️ Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| **Frontend**  | React (Vite), HTML5, CSS3, JavaScript |
| **Backend**   | Java Spring Boot, RESTful APIs        |
| **Database**  | PostgreSQL                            |
| **Tools**     | Git & GitHub, Postman, VS Code / IntelliJ IDEA |

---

## 📂 Project Structure

```
project-root/
│
├── frontend/               # React (Vite) Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/                # Spring Boot Backend
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
├── database/               # Database scripts
│   └── schema.sql
│
├── docs/                   # Project documentation
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔸 Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) (v16 or above)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) (17 or above)
- [Apache Maven](https://maven.apache.org/)
- [PostgreSQL](https://www.postgresql.org/)

---

### 🗄️ Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE petcare_db;
```

2. Run any available SQL scripts from the `/database` folder if provided.

---

### 🔹 Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will start at: `http://localhost:8080`

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at: `http://localhost:5173`

---

## 🔐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/users/profile` | Get user profile |
| `POST` | `/api/pets` | Add a new pet |
| `GET` | `/api/pets` | Get all pets |
| `POST` | `/api/appointments` | Book an appointment |
| `GET` | `/api/appointments` | View appointments |
| `GET` | `/api/products` | Get marketplace products |
| `POST` | `/api/orders` | Place an order |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---



---

## Jenkins Updated
-- This is for testing
