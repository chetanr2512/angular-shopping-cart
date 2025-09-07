# AI Tool Prompts Documentation

## Tools Used

- **ChatGPT/Claude** - Conversational AI for explanations and troubleshooting
- **Perplexity AI** - Research and documentation assistance

## Example Prompts Used

### 1. Initial Angular Project Setup

**Prompt:**
> "Explain the best way to approach the attached pdf and explain why the said approach will be the best and optimal and fulfill all the conditions also provide the steps to proceed further"

**Reasoning:** 
- ✅ **Accepted:** Used reactive programming patterns with RxJS with state management for better usablity making change detection and UI updation easy.

---

### 2. Local Store Logic Implementation

**Prompt:**
> "wirte a service in angular to store data lets say product data coming from fakestoreapi.com/product such that it can be accessed later"

**Reasoning:**
- ✅ **Accepted:** Immutable state updates for reliable change detection
- ✅ **Accepted:** Proper RxJS BehaviorSubject usage

---

### 3. Reactive Forms with Validation

**Prompt:**
> "Create a Reactive Form in Angular with FormBuilder, validating email format and age>18, with async validator for email uniqueness."

**Reasoning:**
- ✅ **Accepted:** Used FormBuilder and reactive forms approach
- ✅ **Accepted:** Comprehensive validation rules implementation
- ✅ **Accepted:** Async validator pattern for email uniqueness simulation
- ❌ **Modified:** Enhanced error messages and user experience

---

### 4. Unit Testing Setup

**Prompt:**
> "Write test case for the cart service such that it checks for the all the possible functions happening inside it "

**Reasoning:**
- ✅ **Accepted:** Proper test structure with describe/it blocks
- ✅ **Accepted:** Mock setup for dependencies using jasmine.createSpyObj
- ❌ **Rejected:** Initial  handling was wrong and was giving errors



### 6. Tailwind CSS Migration(had some screen inspirations from online and needed to convert them to taliwind)

**Prompt:**
> "Convert Bootstrap styled Angular components to use Tailwind CSS for clean responsive UI."

**Reasoning:**
- ✅ **Accepted:** Modern utility-first CSS approach
- ✅ **Accepted:** Better performance and customization
- ✅ **Enhanced:** Added responsive design patterns

### 8. Error Handling Implementation

**Prompt:**
> "Implement comprehensive error handling for HTTP requests and localStorage operations in Angular services."

**Reasoning:**
- ✅ **Accepted:** Try-catch blocks for localStorage operations
- ✅ **Accepted:** RxJS catchError for HTTP requests
- ✅ **Accepted:** Fallback data for offline scenarios
- ✅ **Enhanced:** User-friendly error messages and recovery options

---
