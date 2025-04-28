# BikesProject
Sales tracking application

Bikes_UI (React App)
This is the frontend application built with React for managing bike sales, products, customers, salespersons, and reporting commissions.

How to Run
Node.js and npm installed
Backend API (Bikes_App) running

git clone https://github.com/ruchizest/BikesProject/bikes_ui.git
cd bikes_ui
npm install
npm start
Runs the app in development mode.

Open http://localhost:3000 to view it in the browser.

Features
Manage Products, Customers, Salespersons
Commission Reporting by Quarter
Filter Sale Records

Modern UI with Tabs-based navigation

Tech Stack
React 
Axios for API calls
Basic CSS for styling 

Bikes_App (ASP.NET Core Web API)
This is the backend API built with ASP.NET Core providing RESTful endpoints for the Bikes Sales Management system.
Prerequisites
.NET 8.0 SDK
SQL Server or LocalDB instance

git clone https://github.com/ruchizest/BikesProject/bikes_app.git
cd bikes_app
dotnet restore

Database Setup
Update appsettings.json with your SQL Server connection string.
DB Scripts are available in BikesProject\Bikes_App\Bikes_App\Database\BikesDB_Script.sql

Features
Full CRUD APIs

Sale management with discount application logic
Commission calculation by product
CORS enabled for frontend integration
Entity Framework Core for database operations

Tech Stack
ASP.NET Core 8 Web API
Entity Framework Core
SQL Server
Swagger (for API documentation)

