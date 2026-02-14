# Class Diagram — NexaRetail

## Overview
This class diagram illustrates the domain models and services for the NexaRetail E-commerce platform, emphasizing OOP principles like inheritance, abstraction, and encapsulation.

---

```mermaid
classDiagram
    %% Abstract Base Class
    class Person {
        <<Abstract>>
        -String id
        -String name
        -String email
        -String passwordHash
        +login()
        +logout()
        +updateProfile()
    }

    class Customer {
        -List~Order~ orderHistory
        -ShoppingCart cart
        +addToCart(Product p)
        +checkout()
    }

    class Vendor {
        -String storeName
        -List~Product~ ownedProducts
        +addProduct(Product p)
        +manageStock(String productId, int qty)
    }

    class Admin {
        +verifyVendor(Vendor v)
        +manageCategories(Category c)
    }

    class Product {
        -String id
        -String name
        -double price
        -int stockQuantity
        -Category category
        +getDetails()
        +updatePrice(double newPrice)
    }

    class Category {
        -String name
        -String description
    }

    class Order {
        -String orderId
        -Date orderDate
        -OrderStatus status
        -double totalAmount
        +updateStatus(OrderStatus s)
        +calculateTotal()
    }

    class ShoppingCart {
        -Map~Product, Integer~ items
        +addItem(Product p, int qty)
        +removeItem(Product p)
        +getTotalPrice()
    }

    %% Interfaces for Services
    class IOrderProcessor {
        <<Interface>>
        +process(Order o)
    }

    class INotificationService {
        <<Interface>>
        +notifyUser(String userId, String msg)
    }

    %% Relationships
    Person <|-- Customer : Inherits
    Person <|-- Vendor : Inherits
    Person <|-- Admin : Inherits

    Vendor "1" --> "*" Product : manages
    Customer "1" --> "1" ShoppingCart : owns
    Customer "1" --> "*" Order : places
    Product "*" --> "1" Category : belongs_to
    Order "1" *-- "*" Product : contains
    ShoppingCart "1" o-- "*" Product : contains
```

## OOP Principles Applied
| Principle | Application |
|---|---|
| **Encapsulation** | Private fields with public getters/setters and methods in all domain models. |
| **Inheritance** | `Customer`, `Vendor`, and `Admin` inherit from the abstract `Person` class. |
| **Abstraction** | Interfaces like `IOrderProcessor` and `INotificationService` hide implementation details. |
| **Polymorphism** | Different `Person` types can have specific implementations of shared behaviors. |
