# Architecture Documentation

## Folder Structure

src/
│
├── app/ # Main application source code
│ ├── component/ # Angular standalone components
│ │ ├── navbar/ # Navigation bar component
│ │ ├── product-listing/ # Product listing component
│ │ ├── cart/ # Shopping cart component
│ │ └── user-info/ # User information form component
│ │
│ ├── models/ # TypeScript interfaces for data models
│ │ ├── product.ts
│ │ ├── cart-item.ts
│ │ └── user.ts
│ │
│ ├── services/ # Services for business logic and data handling
│ │ ├── product.service.ts # Product API fetch and filtering
│ │ ├── cart.service.ts # Shopping cart state management + localStorage
│ │ ├── local-storage.service.ts # Abstraction for localStorage operations
│ │ └── cart.service.spec.ts # Unit tests for CartService
│ │
│ ├── app.component.ts # Root component, app shell
│ ├── app.routes.ts # Routes configuration for navigation
│
├── assets/ # Static assets (images, icons)
│
├── styles.css # Global styles using Tailwind CSS or Bootstrap
│


## Component and Service Separation

### **Components:**
-  Angular components handle UI rendering and user interactions.
-  4 Different Angular components for Product listing, User Info, Cart and Navbar.
- Each component subscribes to observables from services to receive reactive data.


### **Services:**
- Centralized business logic and state management live inside services.
- `ProductService` handles fetching product data from API and filtering.
- `CartService` manages cart items, quantity adjustments, and persistence in localStorage.
- `LocalStorageService` abstracts browser storage with error handling.

## Design Decisions

### **Reactive Programming with RxJS:**
- Used `BehaviorSubject` and `Observable` to maintain reactive state.
- Components react automatically to state changes without imperative code.

### **State Immutability:**
- Cart updates create new state objects to ensure change detection and reliable UI updates.

### **Separation of Concerns:**
- Components only handle UI logic.
- Business logic and data access are in injectable singleton services.

### **Styling:**
- Tailwind CSS used.

### **Testing:**
- One unit test for CartService add/remote/update functionality.
- Used Jasmine/Karma for unit test runner.

### **Routing:**
- Angular Router manages page navigation between Products, Cart, and User Info.

## Key Architectural Patterns

### **1. Reactive State Management**
- Services use RxJS BehaviorSubject for centralized state
- Components subscribe to state changes via observables
- Automatic UI updates when data changes

### **2. Dependency Injection**
- Services are injected into components via Angular DI
- Testable architecture with easy mocking
- Singleton pattern ensures shared state

### **3. Immutable Updates**
- State changes create new objects/arrays
- Prevents accidental mutations
- Reliable change detection

### **4. Error Handling**
- Graceful fallback for API failures
- LocalStorage error handling
- User-friendly error messages

---
