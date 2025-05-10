# SEP-QM-test-automation

# MERN E-Commerce Project with Cypress Test Automation

This is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application with integrated end-to-end test automation using Cypress. The system includes:

- **Frontend**: User-facing React application built with Vite  
- **Admin Panel**: Admin-side React application built with Vite  
- **Backend**: REST API built with Node.js and Express  
- **Test Automation**: End-to-end testing using Cypress  

---

## Running the Project

### Admin Panel

  ```bash
cd admin && npm run dev
   ```

### Frontend

  ```bash
cd frontend && npm run dev
   ```

### Backend

  ```bash
cd backend && npm start
   ```
---

## Running Cypress Tests

This project uses **Cypress** for end-to-end automation.

1. Ensure **admin**, **frontend**, and **backend** are all running.  
2. Open Cypress:

  ```bash
   npx cypress open
   ```
3. Select a test spec (e.g., \`login.spec.js\`) and run interactively.

Or run all tests headlessly:

  ```bash
npx cypress run
   ```

---
