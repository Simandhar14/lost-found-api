# Lost & Found API

A Node.js + Express + MongoDB API for managing lost and found items. This project allows users to report lost items, claim found items, and filter lost items by location.

## 🚀 Features

- Report lost items
- Claim found items
- Retrieve nearby lost items

## 🛠️ Setup Instructions

### 1️- Clone the Repository

Clone this repository to your local machine:
git clone https://github.com/yourusername/lost-found-api.git
cd lost-found-api

### 2️- Install Dependencies

Make sure you have **Node.js** installed, then install the required dependencies:
-npm install

### 3- Configure .env file
Kindly change the PORT , MONGO_URL and JWT_SECRET in the .env file according to your needs

### 4- Set Up MongoDB

You can either:

Use MongoDB Atlas (cloud-based solution) to create a MongoDB cluster and obtain the connection string.

Or, set up MongoDB locally on your machine.

Once you have the MongoDB URI, add it to the .env file in the MONGO_URI variable.

### 5-Start the server

Use nodemon index or node index to start the backend server
