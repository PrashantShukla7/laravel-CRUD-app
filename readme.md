## Blog Web app

 - It is a CRUD application developed using PHP framework Laravel and
   React JS for frontend UI.
 - Involves CRUD operations (Create, Read, Update, Delete) with best
   session based authentication using Laravel sanctum.
  
  ## Tech stacks
  - PHP
  - Laravel framework
  - React JS
  - Context API

# Project Setup

This guide explains how to set up the Laravel project on your local system.

---

## **Prerequisites**

Ensure that the following software is installed on your system:

1. **PHP** (Version 8.1 or later)
2. **Composer** (Dependency manager for PHP)
3. **Node.js** (Version 16.x or later)
4. **NPM** or **Yarn**
5. **MySQL** (or any other database you plan to use)
6. **Git** (to clone the repository)

---

### **Step 1: Clone the Repository**

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/PrashantShukla7/laravel-CRUD-app.git
```
## Backend setup

  ```bash 
  cd backend
  ```

### **Step 2: Install Dependencies**

Run the following command to install PHP dependencies:

```bash
composer install
```
### **Step 3: Set Up the Environment File**

Create a copy of the `.env.example` file and rename it to `.env`:

 - **Database Configuration:**
```bash
 DB_CONNECTION=mysql
 DB_HOST=127.0.0.1
 DB_PORT=3306
 DB_DATABASE=your_database_name
 DB_USERNAME=your_database_user
 DB_PASSWORD=your_database_password
```
	
### **Step 4: Generate Application Key**

Run the following command to generate the application key:

```bash
php artisan key:generate
```
### **Step 5: **

Run Database Migrations
```bash
php artisan migrate
```

### **Step 6: Start the Development Server**

```bash
php artisan serve
```

## Frontend setup
```bash
cd frontend
```

### **Step 1: Install Dependencies**

Run the following command to install PHP dependencies:

```bash
npm install
```
### **Step 2: Run Frontend**

Run the following command to install PHP dependencies:

```bash
npm run dev
```

## Access application
```bash
http://localhost:5173 
```
