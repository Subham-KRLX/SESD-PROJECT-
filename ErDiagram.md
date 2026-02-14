# ER Diagram — NexaRetail

## Overview
This Entity-Relationship diagram defines the database schema for the NexaRetail E-commerce platform, including tables for users, products, orders, and their relationships.

---

```mermaid
erDiagram
    USERS {
        uuid id PK
        string name
        string email UK
        string password_hash
        enum role "CUSTOMER | VENDOR | ADMIN"
        timestamp created_at
    }

    PRODUCTS {
        uuid id PK
        string name
        string description
        decimal price
        int stock_qty
        uuid vendor_id FK
        uuid category_id FK
    }

    CATEGORIES {
        uuid id PK
        string name
        string description
    }

    ORDERS {
        uuid id PK
        uuid customer_id FK
        decimal total_amount
        enum status "PENDING | PROCESSING | SHIPPED | DELIVERED | CANCELLED"
        timestamp order_date
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price
    }

    REVIEWS {
        uuid id PK
        uuid customer_id FK
        uuid product_id FK
        int rating
        text comment
        timestamp created_at
    }

    USERS ||--o{ PRODUCTS : "manages (if vendor)"
    USERS ||--o{ ORDERS : "places (if customer)"
    USERS ||--o{ REVIEWS : "writes (if customer)"
    CATEGORIES ||--o{ PRODUCTS : "contains"
    PRODUCTS ||--o{ ORDER_ITEMS : "included_in"
    ORDERS ||--|{ ORDER_ITEMS : "consists_of"
    PRODUCTS ||--o{ REVIEWS : "receives"
```
