# Frontend Architecture

This project is built with **React + Redux Toolkit + TypeScript** and follows the principles of a **layered architecture** with a clear separation of responsibilities between application layers.

---

## Architectural Principles

- **Separation of Concerns** — each layer is responsible for a single, well-defined area
- **Single Source of Truth** — application state is stored in the Redux Store
- **Thin UI / Fat Store** — UI components are minimal, business logic lives outside components
- **Side Effects Isolation** — side effects are isolated in thunks and listeners
- **Explicit Data Flow** — unidirectional data flow (UI → store → UI)
- **Backend-driven contracts** — API types are separated from application state types

---

## Application Layers

### 1. UI Layer (Presentation)

**Purpose:**  
Rendering the user interface and reacting to user interactions.

**Characteristics:**

- contains no business logic
- does not communicate with the API directly
- interacts with the store only via `dispatch` and selectors

**Examples:**

```
ui-features/components/
ui-features/pages/
ui-features/layouts/
```

---

### 2. UI State Layer (Global UI)

**Purpose:**  
Managing global UI-related state shared across the entire application.

**Responsibilities:**

- global loading indicator
- centralized error handling
- dialog / notification-based error display
- cross-feature UI behavior

**Characteristics:**

- contains no business logic
- independent from specific feature domains
- reacts to async lifecycle events (`pending / fulfilled / rejected`)
- implemented via Redux Toolkit `extraReducers` and matchers

**Example:**

```
src/store/ui/
  ui.slice.ts
```

---

### 3. Store Layer (State Management)

**Purpose:**  
Managing application state and business logic.

**Composition:**

- `slice` — state description and synchronous reducers
- `thunks` — asynchronous operations (API requests)
- `listeners` — reactions to events (login/logout, resets, cascade effects)

**Example structure:**

```
src/store/
  cust/
    cust.slice.ts
    cust.thunks.ts
    cust.types.ts
  trans/
    trans.slice.ts
    trans.thunks.ts
    trans.types.ts
  listeners/
    event.listeners.ts
```

---

### 4. API Layer (Data Access)

**Purpose:**  
Encapsulation of HTTP requests and backend contracts.

**Principles:**

- API layer is completely unaware of Redux
- returns raw backend responses
- uses its own Request / Response types

**Example:**

```
src/api/
  cust.api.ts
  cust.types.ts
  trans.api.ts
  trans.types.ts
```

---

### 5. Domain / State Types

**Purpose:**  
Describing the structure of application state stored in Redux.

**Difference from API types:**

- API types — backend data format
- Store types — internal application data format

This separation allows:

- safe backend evolution
- centralized data transformation
- stable internal domain model

---

### 6. Side Effects & Cross-cutting Logic

**Listener Middleware (`event.listeners.ts`) is used for:**

- interacting with `localStorage`
- decoding JWT tokens
- cascading effects (resetting related state)
- logic that does not belong to any single slice

👉 **Thunks do not know about `localStorage` or global side effects.**

---

## Data Flow Example (Login)

```
UI
 ↓ dispatch(loginCust)
Thunk
 ↓ API call
fulfilled action
 ↓
Listener Middleware
 ├─ save token to localStorage
 ├─ decode username
 └─ reset dependent state
 ↓
custSlice
 ↓
UI re-render
```

---

