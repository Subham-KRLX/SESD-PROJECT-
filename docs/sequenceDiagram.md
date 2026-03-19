# Sequence Diagram: Gadget Purchase Lifecycle

## Overview
This diagram details the end-to-end execution flow of a "Purchase Order" use case, demonstrating the interaction between decentralized layers (Clean Architecture).

---

```mermaid
sequenceDiagram
    autonumber
    actor User as "Tech Customer"
    participant UI as "Web Frontend"
    participant Auth as "AuthMiddleware"
    participant OC as "OrderController"
    participant OS as "OrderService"
    participant IS as "InventoryService"
    participant WS as "WalletService"
    participant DB as "PostgreSQL DB"

    User->>UI: Click "Complete Purchase"
    UI->>Auth: POST /api/orders (JWT Token)
    
    alt Unauthorized
        Auth-->>UI: 401 Unauthorized
        UI-->>User: Please login
    else Authorized
        Auth->>OC: Forward Request (User Context)
        OC->>OS: processOrder(cartData)
        
        activate OS
        OS->>IS: reserveStock(items)
        activate IS
        IS->>DB: UPDATE products SET stock = stock - N
        DB-->>IS: success
        IS-->>OS: Stock Locked
        deactivate IS

        OS->>WS: deductCredits(amount)
        activate WS
        WS->>DB: UPDATE wallets SET balance = balance - X
        DB-->>WS: success
        WS-->>OS: Payment Confirmed
        deactivate WS

        OS->>DB: CREATE order_record
        DB-->>OS: order_id
        
        OS-->>OC: Order Success
        deactivate OS

        OC-->>UI: 201 Created (Order Receipt)
        UI-->>User: Show Success & Tracking ID
    end
```

## Key Architectural Steps
1. **Authentication**: Requests are intercepted by a middleware to verify identity.
2. **Resource Locking**: The `InventoryService` ensures stock is reserved before payment is processed.
3. **Atomic Persistence**: Data is committed to the database only after business logic validation.
