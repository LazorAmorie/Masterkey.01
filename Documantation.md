# MasterKey Documentation

## Overview
**MasterKey** is a fintech platform designed as a unified wallet and transaction routing engine. Its goal is to integrate multiple payment systems—mobile wallets, banks, and online payments—into a single seamless interface, optimizing for cost, speed, and usability.

At its core, MasterKey acts as:
* **A wallet manager:** Tracks balances and transaction history.
* **A payment router:** Dynamically chooses the cheapest or fastest payment route for each transaction.
* **A secure platform:** Enforces authentication, authorization, and transaction integrity.

---

## Core Vision
* **Unified Financial Hub:** Provide a single platform to manage multiple payment rails.
* **Cost & Time Optimization:** Automatically select the most efficient payment route.
* **Transparency:** Detailed transaction metadata, history, and statistics for users.
* **Security & Compliance:** JWT-based authentication, active user verification, and secure database communication.
* **Extensibility:** Designed to scale with more payment providers and AI-driven routing logic.

---

## Current Implementation

### Backend

#### 1. Database Layer
* PostgreSQL with Sequelize ORM.
* Central connection configured in `postgres.js`.
* Connection pooling and SSL supported.
* Global model defaults: timestamps and `snake_case`.

#### 2. Authentication (`authController.js`, `authMiddleware.js`)
* **Signup:**
    * Validates username, email, password, and confirm password using Joi.
    * Checks for duplicate email/username.
    * Automatically generates a unique wallet address.
    * Sets a default wallet balance.
    * Returns JWT for stateless authentication.
* **Login:**
    * Validates credentials and checks active account status.
    * Generates JWT and updates last login timestamp.
* **Profile:** Fetches authenticated user data.
* **JWT Middleware:** Strict authentication with `authenticate` middleware.

#### 3. Transactions (`transactionController.js`, `transactionModel.js`)
* **Send Transaction:**
    * Validates input (receiver, amount, route key).
    * Ensures balance sufficiency.
    * Deducts funds and records transaction atomically (Sequelize transactions).
* **Retrieval:** * Fetch single transaction by ID or history with pagination/filtering.
    * Aggregated statistics (total, fees, averages).
* **Status Options:** `PENDING`, `SUCCESS`, `FAILED`, `CANCELLED`.

---

## Future Plans
- [ ] **Advanced Routing Engine:** AI integration for cost-effective route selection.
- [ ] **Multi-Platform Integration:** APIs for Malawian banks and e-wallets (Airtel/TNM).
- [ ] **Enhanced Analytics:** Spend insights, charts, and predictive fee optimization.
- [ ] **Security:** Multi-factor authentication (MFA) and fraud detection.

- [ ] **UX/UI:** Modular React components and interactive dashboards.

---

## Technical Notes
>
> [!IMPORTANT]
> **Environment Variables:** A `.env` file is required for database, JWT secret, and wallet defaults.

* **Logging:** Centralized logger handles all debug and info messages.
* **Error Handling:** Controllers provide structured JSON responses.

---

## Quick Start (Backend)

1. **Install dependencies:**

   ```bash
   npm install

2. **Configure .env:**

   Code snippet

   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DATABASE=masterkey
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=yourpassword
   JWT_SECRET=yourjwtsecret
   DEFAULT_WALLET_BALANCE=10000
   NODE_ENV=development

### Database Initialization

To ensure your database is connected and your tables are created, run the following in your entry file:

```javascript
// Test and Sync
await testConnection();
await syncDatabase();
