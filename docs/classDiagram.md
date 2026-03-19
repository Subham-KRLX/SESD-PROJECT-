# Class Diagram — TechSpark

## Overview
This class diagram shows the major classes, their attributes, methods, and relationships across the TechSpark platform. The design follows **Clean Architecture** (Controller → Service → Repository) with strong **OOP principles** and **design patterns**.

---

```mermaid
classDiagram
    %% Entities
    class User {
        <<Abstract>>
        -uuid id
        -string name
        -string email
        -string passwordHash
        -UserRole role
        +authenticate(string password) bool
        +updateProfile(string name, string email) void
        +getRole() UserRole
    }

    class TechCustomer {
        -List~Order~ orders
        -ShoppingCart activeCart
        -Address shippingAddress
        +placeOrder() Order
        +applyCoupon(string code) void
        +submitReview(uuid gadgetID, int rating, string comment) void
    }

    class GadgetVendor {
        -string brandName
        -boolean isVerified
        -decimal rating
        +listGadget(Gadget g) void
        +updateStock(uuid gid, int qty) void
        +getPerformanceReport() Report
    }

    class Admin {
        -int accessLevel
        +verifyVendor(uuid vid) void
        +manageCategories(uuid cid, string action) void
        +systemAudit() List~Log~
    }

    class Gadget {
        -uuid id
        -string modelName
        -string manufacturer
        -string techSpecs
        -decimal price
        -int stockQty
        +getDetails() string
        +isAvailable() bool
        +updatePrice(decimal newPrice) void
    }

    class Category {
        -uuid id
        -string name
        -string description
        +getSubCategories() List~Category~
    }

    class Order {
        -uuid orderId
        -Date timestamp
        -OrderStatus status
        -decimal totalAmount
        -string trackingNumber
        +calculateTotal() decimal
        +updateStatus(OrderStatus s) void
        +cancelOrder() bool
    }

    class OrderItem {
        -uuid id
        -uuid gadgetID
        -int quantity
        -decimal priceAtPurchase
        +getSubTotal() decimal
    }

    class ShoppingCart {
        -uuid cartId
        -List~CartItem~ items
        -Date lastUpdated
        +addItem(Gadget g, int qty) void
        +removeItem(uuid gid) void
        +clearCart() void
    }

    class Review {
        -uuid id
        -int performanceRating
        -string comment
        -Date createdAt
        +editReview(string newComment) void
    }

    class Payment {
        <<Abstract>>
        -uuid transactionId
        -decimal amount
        -PaymentStatus status
        +process() bool
    }

    %% Interfaces and Services
    class INotificationService {
        <<Interface>>
        +send(string userId, string msg) void
    }

    class IPaymentGateway {
        <<Interface>>
        +authorize(decimal amount) bool
        +refund(uuid transactionId) bool
    }

    class IOrderMatchingStrategy {
        <<Interface>>
        +match(Order o) void
    }

    %% Relationships
    User <|-- TechCustomer : Inheritance
    User <|-- GadgetVendor : Inheritance
    User <|-- Admin : Inheritance

    GadgetVendor "1" --> "*" Gadget : Manages
    TechCustomer "1" --> "*" Order : Places
    TechCustomer "1" --> "1" ShoppingCart : Owns
    TechCustomer "1" --> "*" Review : Writes
    
    Order "1" *-- "*" OrderItem : Composition
    OrderItem "*" --> "1" Gadget : References
    Order "1" -- "1" Payment : Associated_with
    
    Gadget "*" --> "1" Category : Belongs_to
    Gadget "1" -- "*" Review : Receives
    
    ShoppingCart "1" o-- "*" Gadget : Aggregation
    
    Order --> IOrderMatchingStrategy : Uses
```

## Design Patterns in the Class Diagram

| Pattern | Where Applied | Purpose |
|---|---|---|
| **Strategy** | `IOrderMatchingStrategy` | Allows switching between different vendor-matching or shipping algorithms at runtime. |
| **Repository** | `Gadget`, `Order` persistence | Decouples the domain logic from the database implementation (Prisma/PostgreSQL). |
| **Strategy** | `Payment` inheritance | Provides different implementations for credit cards, wallets, or crypto. |
| **Observer** | `INotificationService` | Notifies customers automatically when order status changes (e.g., Shipped). |

## OOP Principles Applied
- **Abstraction**: The `User` and `Payment` classes are abstract, hiding implementation details.
- **Inheritance**: `TechCustomer`, `GadgetVendor`, and `Admin` specialize the `User` base class.
- **Encapsulation**: All attributes are private (`-`) and accessed only via public (`+`) methods.
- **Polymorphism**: `INotificationService` can be implemented as Email, SMS, or Push without changing the caller.
- **Composition**: `Order` has a strong lifecycle dependency on `OrderItem`.
