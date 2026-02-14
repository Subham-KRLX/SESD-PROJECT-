# Use Case Diagram — TechSpark

## Overview
This diagram represents the functional requirements of the TechSpark platform, illustrating how different actors interact with the system to achieve their goals.

---

```mermaid
graph LR
    subgraph TechSpark System
        UC1(Register / Login)
        UC2(Manage Tech Profile)
        UC3(Browse Professional Gadgets)
        UC4(Filter by Technical Specs)
        UC5(Compare Gadgets)
        UC6(Manage Tech Cart)
        UC7(Execute Checkout)
        UC8(Track Shipment Status)
        UC9(Submit Technical Review)
        UC10(Manage Gadget Inventory)
        UC11(Analyze Sales Data)
        UC12(Moderate Users)
        UC13(Configure Tech Categories)
        UC14(Process Order/Refund)
    end

    Customer((Tech Customer))
    Vendor((Gadget Vendor))
    Admin((System Admin))

    %% Customer Relationships
    Customer --- UC1
    Customer --- UC2
    Customer --- UC3
    Customer --- UC4
    Customer --- UC5
    Customer --- UC6
    Customer --- UC7
    Customer --- UC8
    Customer --- UC9

    %% Vendor Relationships
    Vendor --- UC1
    Vendor --- UC10
    Vendor --- UC11
    Vendor --- UC14

    %% Admin Relationships
    Admin --- UC1
    Admin --- UC12
    Admin --- UC13
    Admin --- UC11
```

## Actor Descriptions
- **Tech Customer**: An enthusiast looking for specialized hardware. Can browse, buy, and review tools.
- **Gadget Vendor**: A tech brand or verified seller. Manages inventory, prices, and processes incoming orders.
- **System Admin**: Oversees the platform. Manages categories, verifies vendors, and monitors overall system health.
