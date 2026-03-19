# ER Diagram — TechSpark
## Overview
The TechSpark database schema is designed for consistency, integrity, and scalability, featuring normalized tables for users, tech inventory, and order processing.

---

```mermaid
erDiagram
    USERS {
        uuid id PK
        string full_name
        string email UK
        string password_hash
        enum role "CUSTOMER | VENDOR | ADMIN"
        timestamp created_at
        timestamp updated_at
    }

    VENDORS {
        uuid id PK
        uuid user_id FK
        string brand_name
        boolean is_verified
        string tech_niche
    }

    CATEGORIES {
        uuid id PK
        string name UK
        string description
    }

    GADGETS {
        uuid id PK
        uuid vendor_id FK
        uuid category_id FK
        string model_name
        text technical_specs
        decimal price
        int stock_count
        timestamp last_restock
    }

    ORDERS {
        uuid id PK
        uuid customer_id FK
        decimal total_price
        enum status "PENDING | PAID | SHIPPED | DELIVERED"
        timestamp order_date
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid gadget_id FK
        int quantity
        decimal unit_price_at_purchase
    }

    REVIEWS {
        uuid id PK
        uuid customer_id FK
        uuid gadget_id FK
        int performance_rating
        text feedback_text
        timestamp created_at
    }

    USERS ||--o| VENDORS : "extends (if vendor)"
    USERS ||--o{ ORDERS : "initiates"
    USERS ||--o{ REVIEWS : "authors"
    VENDORS ||--o{ GADGETS : "registers"
    CATEGORIES ||--o{ GADGETS : "groups"
    ORDERS ||--|{ ORDER_ITEMS : "comprises"
    GADGETS ||--o{ ORDER_ITEMS : "added_to"
    GADGETS ||--o{ REVIEWS : "evaluated_in"
```

## Schema Highlights
- **Role Separation**: Vendors have their own specialized table linked to the User record.
- **Data Integrity**: Enums for roles and statuses prevent invalid state transitions.
- **Audit Ready**: `created_at` and `updated_at` fields in core tables for tracking changes.
- **Niche Focus**: `technical_specs` stored as structured text/JSON to hold varied gadget data.
