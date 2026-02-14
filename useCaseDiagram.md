# Use Case Diagram — TechSpark

## Overview
This diagram describes the primary use cases for the TechSpark e-commerce platform, focusing on the gadget discovery and acquisition process.

---

```mermaid
useCaseDiagram
    actor "Tech Customer" as Customer
    actor "Gadget Vendor" as Vendor
    actor "Admin" as Admin

    package "TechSpark Platform" {
        usecase "Register/Login" as UC1
        usecase "Browse Tech Gadgets" as UC2
        usecase "Compare Specifications" as UC3
        usecase "Add to Tech Cart" as UC4
        usecase "Place Tech Order" as UC5
        usecase "Track Shipment" as UC6
        usecase "Rate Gadget Performance" as UC7
        usecase "Manage Tech Inventory" as UC8
        usecase "Update Gadget Specs" as UC9
        usecase "Manage Tech Categories" as UC10
        usecase "System Analytics" as UC11
    }

    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4
    Customer --> UC5
    Customer --> UC6
    Customer --> UC7

    Vendor --> UC1
    Vendor --> UC8
    Vendor --> UC9
    Vendor --> UC11

    Admin --> UC1
    Admin --> UC10
    Admin --> UC11
```
