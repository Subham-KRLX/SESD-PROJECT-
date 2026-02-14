# Class Diagram — TechSpark

## Overview
This diagram illustrates the object-oriented structure of the TechSpark platform, demonstrating high-level abstraction, inheritance, and architectural separation using Clean Architecture principles.

---

```mermaid
classDiagram
    %% Core Domain Layer (Entities)
    subgraph DomainEntities
        class User {
            <<Abstract>>
            -uuid id
            -string name
            -string email
            -string passwordHash
            +authenticate()
            +updateProfile()
        }

        class TechCustomer {
            -List~Order~ orders
            -ShoppingCart activeCart
            +placeOrder()
            +submitReview()
        }

        class GadgetVendor {
            -string brandName
            -boolean isVerified
            +addGadget(Gadget g)
            +manageStock(uuid gid, int qty)
        }

        class Admin {
            +verifyVendor(uuid vid)
            +manageCategories()
        }

        class Gadget {
            -uuid id
            -string modelName
            -string technicalSpecs
            -decimal price
            -int stockQty
            +getAvailability()
        }

        class Order {
            -uuid orderId
            -Date timestamp
            -OrderStatus status
            -decimal totalAmount
            +calculateTotal()
            +updateStatus(OrderStatus s)
        }
    }

    %% Interfaces (Abstraction)
    subgraph InfrastructureInterfaces
        class INotificationService {
            <<Interface>>
            +send(string userId, string msg)
        }

        class IPaymentGateway {
            <<Interface>>
            +authorize(decimal amount)
            +refund(uuid transactionId)
        }
    }

    %% Relationships
    User <|-- TechCustomer : Inheritance
    User <|-- GadgetVendor : Inheritance
    User <|-- Admin : Inheritance

    GadgetVendor "1" --> "*" Gadget : Manage
    TechCustomer "1" --> "*" Order : Places
    Order "1" *-- "*" Gadget : Composition (OrderItems)
    Gadget "*" --> "1" Category : Categorization
```

## Applied OOP & Design Principles
- **Abstraction**: Base `User` class is abstract, forcing implementation of specific role behaviors.
- **Inheritance**: `TechCustomer` and `GadgetVendor` reuse common properties from `User`.
- **Encapsulation**: Private state management with public behavioral methods.
- **Dependency Inversion**: High-level logic depends on `IPaymentGateway` interface, not concrete drivers.
- **Composition**: `Order` contains multiple `Gadget` references through an internal link.
