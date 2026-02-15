# Backend Architecture

This project is built with **PHP + Symfony + Doctrine ORM** and follows
the principles of a **layered architecture** with strict separation
between HTTP, application, and domain logic.

The architecture ensures predictable data flow:

FE → Kernel → Security → Resolver → Controller → Service → Repository →
Mapper → JsonResponse → FE

------------------------------------------------------------------------

## Architectural Principles

-   **Separation of Concerns** --- each layer has a single
    responsibility
-   **Thin Controllers / Fat Services** --- business logic lives in
    services
-   **DTO-driven boundaries** --- request & response models are explicit
-   **Domain-first approach** --- services operate on domain entities,
    not primitives
-   **Centralized validation** --- input validation happens before
    business logic
-   **Explicit data flow** --- no hidden magic, clear processing chain

------------------------------------------------------------------------

## Request Lifecycle Overview

### 1. Kernel Layer (HTTP Entry Point)

**Purpose:**\
Handles the incoming HTTP request and bootstraps the application.

Incoming HTTP Request\
↓\
Kernel

------------------------------------------------------------------------

### 2. Security Layer

**Purpose:**\
Authentication and user resolution.

Responsibilities:

-   JWT / token authentication
-   resolving the authenticated `Customer`
-   injecting user into controller arguments

FE → Kernel → Security

------------------------------------------------------------------------

### 3. Argument Resolver Layer

**Purpose:**\
Transform raw HTTP input into structured DTO objects.

Example:

App`\ArgumentResolver`{=tex}`\FilterTransactionRequestResolver`{=tex}

Responsibilities:

-   read query parameters
-   construct DTO
-   validate DTO
-   stop execution on invalid input (400)

Example structure:

src/ArgumentResolver/\
FilterTransactionRequestResolver.php

------------------------------------------------------------------------

### 4. DTO Layer (Request Models)

**Purpose:**\
Represent validated input data.

Example:

App`\DTO`{=tex}`\FilterTransactionRequest`{=tex}

Characteristics:

-   strict typing
-   Symfony validation attributes
-   normalization (string → float, string → DateTimeImmutable)

Example structure:

src/DTO/\
FilterTransactionRequest.php

------------------------------------------------------------------------

### 5. Controller Layer (HTTP Orchestration)

**Purpose:**\
Coordinate request handling without containing business logic.

Characteristics:

-   no validation logic
-   no database logic
-   no domain rules
-   delegates to services

Example:

src/Controller/\
TransactionController.php

------------------------------------------------------------------------

### 6. Service Layer (Business Logic)

**Purpose:**\
Contains core application rules.

Responsibilities:

-   apply domain rules
-   coordinate repositories
-   throw domain exceptions
-   return response DTOs

Example:

src/Service/\
TransactionService.php

Principles:

-   operates on domain entities (`Customer`)
-   does not know about HTTP
-   does not return JsonResponse
-   throws domain exceptions (e.g. `TransactionNotFoundException`)

------------------------------------------------------------------------

### 7. Repository Layer (Data Access)

**Purpose:**\
Encapsulate database access using Doctrine.

Example:

src/Repository/\
TransactionRepository.php

Responsibilities:

-   querying entities
-   applying filters
-   returning domain entities

------------------------------------------------------------------------

### 8. Domain Layer (Entities)

**Purpose:**\
Represent core business models.

Examples:

src/Entity/\
Customer.php\
Transaction.php

Characteristics:

-   Doctrine ORM mapping
-   relationships (ManyToOne, etc.)
-   pure domain state

------------------------------------------------------------------------

### 9. Mapper Layer (Entity → Response)

**Purpose:**\
Transform domain entities into response DTOs.

Example:

src/Mapper/\
TransactionMapper.php

Responsibilities:

-   entity → array / response DTO
-   formatting
-   serialization preparation

------------------------------------------------------------------------

### 10. Response Layer (Output Models)

**Purpose:**\
Define explicit API response structure.

Example:

src/Response/\
TransactionListResponse.php

Ensures:

-   stable API contracts
-   backend-driven responses
-   no direct entity exposure

------------------------------------------------------------------------

## Exception Handling & Validation

Validation happens in:

Resolver → ValidatorInterface

If validation fails:

BadRequestHttpException (400)

Domain errors are thrown in Services and handled by:

ExceptionListener

Ensuring consistent JSON error responses.

------------------------------------------------------------------------

## Data Flow Example (Get Transactions)

FE\
↓\
Kernel\
↓\
Security (resolve Customer)\
↓\
ArgumentResolver\
↓ create & validate FilterTransactionRequest\
↓\
Controller\
↓\
TransactionService\
↓\
TransactionRepository (Doctrine)\
↓\
TransactionMapper\
↓\
TransactionListResponse\
↓\
JsonResponse\
↓\
FE

------------------------------------------------------------------------

## Folder Structure Overview

src/\
ArgumentResolver/\
Controller/\
DTO/\
Entity/\
Exception/\
Mapper/\
Repository/\
Response/\
Service/

------------------------------------------------------------------------

## Design Benefits

-   predictable request lifecycle
-   clean controller layer
-   testable services
-   isolated validation
-   stable API contracts
-   maintainable domain model
-   scalable architecture for new features

------------------------------------------------------------------------

## Core Philosophy

Backend is responsible for:

-   enforcing business rules
-   protecting domain integrity
-   validating all input
-   returning structured contracts

Frontend consumes structured, predictable API responses.
