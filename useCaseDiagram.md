# Use Case Diagram — NexaRetail

## Overview
This diagram depicts the interactions between various actors (Customer, Vendor, Admin) and the core functionalities of the NexaRetail E-commerce system.

---

```mermaid
useCaseDiagram
    actor Customer
    actor Vendor
    actor Admin

    package "NexaRetail System" {
        usecase "Register/Login" as UC1
        usecase "Search & View Products" as UC2
        usecase "Manage Cart" as UC3
        usecase "Place Order" as UC4
        usecase "Track Order" as UC5
        usecase "Write Product Review" as UC6
        usecase "Manage Inventory" as UC7
        usecase "Process Orders" as UC8
        usecase "Manage Categories" as UC9
        usecase "View Sales Analytics" as UC10
        usecase "Manage Users" as UC11
    }

    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4
    Customer --> UC5
    Customer --> UC6

    Vendor --> UC1
    Vendor --> UC7
    Vendor --> UC8
    Vendor --> UC10

    Admin --> UC1
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11
```
