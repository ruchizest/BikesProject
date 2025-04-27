-- Create the Bikes_DB database
CREATE DATABASE Bikes_DB;
GO

USE Bikes_DB;
GO

CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Manufacturer NVARCHAR(100),
    Style NVARCHAR(100),
    PurchasePrice DECIMAL(10, 2),
    SalePrice DECIMAL(10, 2),
    QtyOnHand INT,
    CommissionPercentage DECIMAL(5, 2),
    CONSTRAINT UQ_Product UNIQUE (Name)
);

INSERT INTO Products (Name, Manufacturer, Style, PurchasePrice, SalePrice, QtyOnHand, CommissionPercentage)
VALUES
('Mountain Explorer', 'Trek', 'Mountain', 500.00, 750.00, 10, 5.00),
('City Cruiser', 'Giant', 'Hybrid', 300.00, 450.00, 15, 4.50),
('Speedster 2000', 'Specialized', 'Road', 1200.00, 1600.00, 5, 6.00),
('Trail Blazer', 'Cannondale', 'Mountain', 800.00, 1150.00, 8, 5.50),
('Urban Commuter', 'Schwinn', 'Hybrid', 400.00, 600.00, 12, 4.00),
('Rapid Racer', 'Bianchi', 'Road', 1500.00, 2100.00, 4, 7.00);


CREATE TABLE Salespersons (
    SalespersonID INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Address NVARCHAR(255),
    Phone NVARCHAR(20),
    StartDate DATE,
    TerminationDate DATE,
    Manager NVARCHAR(100),
    CONSTRAINT UQ_SalespersonName UNIQUE (FirstName, LastName)
);


INSERT INTO Salespersons (FirstName, LastName, Address, Phone, StartDate, TerminationDate, Manager)
VALUES
('John', 'Doe', '123 Elm Street, Springfield', '555-1234', '2020-01-15', '9999-12-31', 'Sarah Smith'),
('Jane', 'Smith', '456 Oak Avenue, Riverdale', '555-5678', '2019-03-22', '9999-12-31', 'Michael Johnson'),
('Emily', 'Brown', '789 Maple Lane, Centerville', '555-8765', '2021-06-10', '9999-12-31', 'Sarah Smith'),
('Daniel', 'Wilson', '321 Pine Road, Lincoln', '555-4321', '2018-11-05', '9999-12-31', 'Michael Johnson'),
('Chris', 'Taylor', '654 Cedar Boulevard, Shelbyville', '555-3456', '2022-08-19', '9999-12-31', 'Sarah Smith');

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1), -- Auto-incremented primary key
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Address NVARCHAR(255),
    Phone NVARCHAR(20),
    Email NVARCHAR(100),
    StartDate DATE,
    CONSTRAINT UQ_CustomerNamePhone UNIQUE (FirstName, LastName, Phone)
);

INSERT INTO Customers (FirstName, LastName, Address, Phone, Email, StartDate)
VALUES
('Alice', 'Johnson', '101 Main Street, Springfield', '555-1010', 'alice.johnson@example.com', '2023-01-05'),
('Bob', 'Anderson', '202 Pine Street, Riverdale', '555-2020', 'bob.anderson@example.com', '2022-07-15'),
('Cathy', 'Miller', '303 Oak Avenue, Centerville', '555-3030', 'cathy.miller@example.com', '2023-03-20'),
('David', 'Smith', '404 Maple Drive, Lincoln', '555-4040', 'david.smith@example.com', '2021-11-30'),
('Emma', 'Davis', '505 Cedar Road, Shelbyville', '555-5050', 'emma.davis@example.com', '2022-05-18');


CREATE TABLE Sales (
    SaleID INT PRIMARY KEY IDENTITY(1,1), -- Auto-incremented sale ID
    ProductID INT NOT NULL,
    SalespersonID INT NOT NULL,
    CustomerID INT NOT NULL,
    SaleDate DATE NOT NULL,
    CONSTRAINT FK_Sales_Product FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    CONSTRAINT FK_Sales_Salesperson FOREIGN KEY (SalespersonID) REFERENCES Salesperson(SalespersonID),
    CONSTRAINT FK_Sales_Customer FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

INSERT INTO Sales (ProductID, SalespersonID, CustomerID, SaleDate)
VALUES
(1, 1, 1, '2024-01-10'), -- John Doe sold "Mountain Explorer" to Alice Johnson
(2, 2, 2, '2024-02-05'), -- Jane Smith sold "City Cruiser" to Bob Anderson
(3, 3, 3, '2024-02-18'), -- Emily Brown sold "Speedster 2000" to Cathy Miller
(4, 1, 4, '2024-03-12'), -- John Doe sold "Trail Blazer" to David Smith
(5, 5, 5, '2024-04-01'), -- Chris Taylor sold "Urban Commuter" to Emma Davis
(6, 2, 1, '2024-04-15'); -- Jane Smith sold "Rapid Racer" to Alice Johnson again


CREATE TABLE Discount (
    DiscountID INT PRIMARY KEY IDENTITY(1,1), -- Auto-incremented discount ID
    ProductID INT NOT NULL,
    BeginDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    DiscountPercentage DECIMAL(5, 2) NOT NULL,
    CONSTRAINT FK_Discount_Product FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

INSERT INTO Discount (ProductID, BeginDate, EndDate, DiscountPercentage)
VALUES
(1, '2024-06-01', '2024-06-30', 10.00), -- 10% off Mountain Explorer for June
(2, '2024-07-01', '2024-07-15', 5.00),  -- 5% off City Cruiser for first half of July
(3, '2024-05-15', '2024-06-15', 15.00), -- 15% off Speedster 2000 during late spring
(4, '2024-08-01', '2024-08-31', 12.00), -- 12% off Trail Blazer in August
(5, '2024-05-01', '2024-05-31', 8.00);  -- 8% off Urban Commuter during May


