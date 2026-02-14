# Sequence Diagram: Checkout & Order Placement

## Overview
This diagram illustrates the end-to-end flow of a customer placing an order, from adding products to the cart to the final order confirmation and notification.

---

```mermaid
sequenceDiagram
    actor Customer
    participant FE as "Frontend (React)"
    participant OC as "OrderController"
    participant OS as "OrderService"
    participant IS as "InventoryService"
    participant WS as "WalletService"
    participant DB as "Database (PostgreSQL)"
    participant NS as "NotificationService"

    Customer->>FE: Click "Place Order"
    FE->>OC: POST /api/orders (cartItems)
    OC->>OS: placeNewOrder(customerId, cartItems)
    
    activate OS
    OS->>IS: checkAndReserveStock(cartItems)
    IS-->>OS: stockAvailable (true/false)
    
    alt Stock Available
        OS->>WS: processPayment(customerId, totalAmount)
        WS-->>OS: paymentSuccess (true/false)
        
        alt Payment Success
            OS->>DB: createOrderRecord(details)
            DB-->>OS: orderId
            OS->>NS: sendConfirmation(customerId, orderId)
            NS-->>OS: sent
            OS-->>OC: Order Success (orderId)
            OC-->>FE: HTTP 201 Created
            FE-->>Customer: Display Success Message
        else Payment Failed
            OS->>IS: releaseReservedStock(cartItems)
            OS-->>OC: Error: Payment Failed
            OC-->>FE: HTTP 402 Payment Required
            FE-->>Customer: Display Payment Error
        end
    else Stock Unavailable
        OS-->>OC: Error: Item(s) Out of Stock
        OC-->>FE: HTTP 409 Conflict
        FE-->>Customer: Display Stock Error
    end
    deactivate OS
```
