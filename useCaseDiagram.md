# Use Case Diagram

```mermaid
useCaseDiagram
    actor Prosumer
    actor Consumer
    actor Operator as "Grid Operator"
    actor Admin

    package "GreenGrid P2P Trading Platform" {
        usecase "Register/Login" as UC1
        usecase "Manage Wallet (Deposit/Withdraw)" as UC2
        usecase "Register Smart Meter" as UC3
        usecase "Monitor Real-time Consumption/Production" as UC4
        usecase "Place Buy Order" as UC5
        usecase "Place Sell Order" as UC6
        usecase "View Trade History" as UC7
        usecase "Join Community Group" as UC8
        usecase "Manage Grid Zones" as UC9
        usecase "Set Compliance Rules" as UC10
        usecase "View System Analytics" as UC11
    }

    Prosumer --> UC1
    Prosumer --> UC2
    Prosumer --> UC3
    Prosumer --> UC4
    Prosumer --> UC6
    Prosumer --> UC7
    Prosumer --> UC8

    Consumer --> UC1
    Consumer --> UC2
    Consumer --> UC3
    Consumer --> UC4
    Consumer --> UC5
    Consumer --> UC7
    Consumer --> UC8

    Operator --> UC1
    Operator --> UC9
    Operator --> UC10
    Operator --> UC11

    Admin --> UC1
    Admin --> UC11
```
