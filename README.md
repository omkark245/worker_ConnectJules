# Worker Connect App

A platform connecting workers and customers, similar to OLX.

## Technologies Used
- **Frontend:** React (Vite), Tailwind CSS, Axios, Lucide React, Framer Motion
- **Backend:** Java Spring Boot, Spring Data JPA, Spring Security (JWT)
- **Database:** MySQL (Compatible with XAMPP)

## Project Structure
- `/backend`: Spring Boot application
- `/frontend`: React application

## Setup Instructions

### Database Setup
1. Open XAMPP and start Apache and MySQL.
2. Go to `phpMyAdmin` (http://localhost/phpmyadmin).
3. Create a new database named `worker_db`.

### Backend Setup
1. Navigate to the `backend` directory.
2. Update `src/main/resources/application.properties` with your MySQL credentials if different from default (root/no password).
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Key Features
- **Roles:** Admin, Worker, Customer.
- **Customers:** Post job ads, search for best workers in city/area, rate workers.
- **Workers:** View job ads, access customer contact (10 free, then ₹100 each), manage wallet with simulated Razorpay payment.
- **Admin:** Verify workers, view all jobs, workers, and payment transactions.

## Monetization Logic
- Every worker gets their first 10 job contacts for free.
- After 10 jobs, ₹100 is deducted from their wallet for each new job contact they view.
- Workers can add funds to their wallet via the dashboard.
