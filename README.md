# Products and Categories Management System

This is a full-stack application designed to manage products and categories, built with **.NET 8 Web API** for the backend and **Angular 18/19** for the frontend. The application supports CRUD operations, hierarchical category relationships, server-side filtering, pagination, and a dashboard with analytics.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)

---

## Features

### Backend:
- Manage products and categories with hierarchical relationships.
- Support for status management (e.g., active, inactive).
- Server-side pagination, filtering, and sorting.
- Built-in validation using **FluentValidation**.
- Database integration using **Entity Framework Core**.
- Fast and modular API structure using **FastEndpoints**.

### Frontend:
- Responsive and interactive UI built with **Angular**.
- Category tree structure for easy management.
- Product management with inline editing and filtering.
- Dashboard with analytics and visual charts using **PrimeNG**.

---

## Technologies Used

### Backend:
- **.NET 8 Web API**
- **Entity Framework Core**
- **FastEndpoints**
- **FluentValidation**
- **Swagger** for API documentation

### Frontend:
- **Angular 18/19**
- **PrimeNG**
- **Angular Material**
- **RxJS** for state management
- **Flex Layout** for responsive design

---

## Prerequisites

- .NET 8 SDK
- Node.js (v18 or higher)
- Angular CLI
- SQL Server (or any compatible database engine)

---

## Setup Instructions

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/products-categories-management.git
   cd products-categories-management/backend
   ```

2. Install dependencies:
   ```bash
   dotnet restore
   ```

3. Update `appsettings.json` with your database connection string:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=your_server;Database=ProductsDb;Trusted_Connection=True;"
     }
   }
   ```

4. Apply migrations and update the database:
   ```bash
   dotnet ef database update
   ```

5. Run the API:
   ```bash
   dotnet run
   ```

6. Access the API documentation at `http://localhost:5000/swagger`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd products-categories-management/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   ng serve
   ```

4. Open the application in your browser at `http://localhost:4200`.

---

## Database Schema

### Tables

- **Products**:
  - `Id`: GUID (Primary Key)
  - `Name`: string
  - `Description`: string
  - `Price`: decimal (18,2)
  - `CategoryId`: GUID (Foreign Key)
  - `Status`: Enum (Active, Inactive, Discontinued)
  - `StockQuantity`: int
  - `ImageUrl`: string (nullable)
  - `CreatedDate`: DateTime
  - `UpdatedDate`: DateTime

- **Categories**:
  - `Id`: GUID (Primary Key)
  - `Name`: string
  - `Description`: string (nullable)
  - `ParentCategoryId`: GUID (nullable)
  - `Status`: Enum (Active, Inactive)
  - `CreatedDate`: DateTime
  - `UpdatedDate`: DateTime

---

## API Endpoints

### Products
- `GET /api/products` - List all products with pagination and filtering.
- `POST /api/products` - Add a new product.
- `PUT /api/products/{id}` - Update an existing product.
- `DELETE /api/products/{id}` - Delete a product.

### Categories
- `GET /api/categories` - List all categories.
- `POST /api/categories` - Add a new category.
- `PUT /api/categories/{id}` - Update an existing category.
- `DELETE /api/categories/{id}` - Delete a category.

---

## Testing

### Backend:
- Use **xUnit** and **Moq** for unit tests.
- Run tests:
  ```bash
  dotnet test
  ```

### Frontend:
- Use **Jasmine** and **Karma** for unit tests.
- Run tests:
  ```bash
  ng test
  ```

---

## Future Enhancements

1. Add user authentication and authorization.
2. Implement caching for frequently accessed data.
3. Enhance the dashboard with more visual analytics.
4. Add support for uploading and managing product images.
5. Support export/import of product and category data in CSV format.

---

Feel free to contribute to this project or raise issues in the repository. For more information, contact aalsakr88@gmail.com`.

