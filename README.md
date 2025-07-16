# Autowise Parts E-Commerce Application

This application is a full-stack e-commerce platform for Autowise Parts Co., built with React for the frontend and Express.js for the backend.

## Setup

1.  **Environment Setup:** Follow the instructions in `setup.txt`.
2.  **Install Dependencies:**
    * Navigate to the `client` directory and run `npm install`.
    * Navigate to the `server` directory and run `npm install`.
3.  **Start the Application:**
    * In the `server` directory, run `npm start`.
    * In the `client` directory, run `npm start`.
4.  The application will be accessible at `http://localhost:3000`.

## Key Features

* User authentication (login/register).
* Product catalog with search, filtering, and detailed descriptions.
* Shopping cart and checkout process with payment gateway integration.
* Order tracking.
* Product reviews and ratings.
* Real-time inventory updates (simulated).

## Known Issues (Simulated 30%)

* Performance: Slow initial load times for the product catalog under heavy load.
* Functional: Occasional issues with payment gateway integration during peak usage.
* Functional: Edge case issues with user authentication under certain network conditions.
* Performance: Order tracking can sometimes have delays.
* Functional: Review system sometimes fails to post reviews.
* Functional: Search functionality sometimes fails to return correct results.
* Performance: Cart page sometimes has performance issues with large carts.

## Technical Stack

* **Frontend:** React, Redux, Axios, CSS.
* **Backend:** Node.js, Express.js, MongoDB (simulated), Mongoose (simulated).

## Notes

* This is a simplified version for demonstration purposes.
* Payment gateway and database integrations are simulated.
* Responsive design is implemented for mobile browsers.