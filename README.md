# Full Stack Web Development — Lab 04: JavaScript Fundamentals

## 📌 Description
This repository contains the practical deliverables for **Lab 04: JavaScript Fundamentals**. The project focuses on mastering core JavaScript building blocks—variable scope (`var`, `let`, `const`), hoisting, object-oriented modeling, conditions, loops, array methods, and modern ES6 features. It includes a guided **Student Result Dashboard** (with embedded **Warm-Up Tasks**), an independent real-world case study for an **Online Bookstore Order System**, and the finalized lab report document.

---

## 📁 Repository Structure

```text
Full-stack-lab-04/
│
├── Student Result Dashboard/
│   ├── index.html                  # Guided project UI for student result management
│   ├── style.css                   # Modern responsive styling and card grid layout
│   └── script.js                   # Guided practice logic + Warm-Up Tasks 1–4 implementation
│
├── Online Bookstore Order System/
│   ├── index.html                  # Interactive e-commerce management portal UI
│   ├── style.css                   # Responsive layout for catalog, sidebar, and status logs
│   └── script.js                   # Case study implementation (Tasks 1–5 business logic)
│
└── 241829_Muhammad Ahmad Shafique.docx # Complete lab report document with output screenshots
```

---

## 🚀 Topics & Technologies Covered

- **Variables & Scope**: Practical application of `var`, `let`, and `const` keywords with scope rationale comments.
- **Hoisting Mechanics**: Hands-on demonstration of variable hoisting behavior in the browser console.
- **Data Modeling**: Structuring entity records using JavaScript Objects and Arrays of Objects.
- **Control Logic & Operators**: Evaluating conditions using ternary operators, comparison, and logical operators.
- **Iteration Loops**: Iterating dataset records using classic `for`, `for...in`, `for...of`, and `forEach` loops.
- **Functional Array Methods**: Data processing using `map()`, `filter()`, `reduce()`, `sort()`, and `find()`.
- **ES6 Modern Features**: ES6 Classes, constructors, arrow functions, object destructuring, and template literals.

---

## 💻 Included Projects & Tasks

### 1. Student Result Dashboard & Warm-Up Tasks (`/Student Result Dashboard`)
An analytical performance dashboard combined with foundational console warm-up task execution:
- **Interactive Search & Filter**: Dynamic name filtering using `.includes()` and pass/fail filtering via `.filter()`.
- **Class Metrics Calculation**: Dynamic computation of class average, highest scorer, and pass percentage using `.reduce()`.
- **Console Warm-Up Tasks (inside `script.js`)**:
  - **Task 1:** Modifying object properties and confirming dynamic UI updates.
  - **Task 2:** Logging calculated letter grades step-by-step from `getGrade()`.
  - **Task 3:** Printing student names and pass/fail statuses using a `for...of` loop.
  - **Task 4:** Extracting failed student names using chained `.filter()` and `.map()` methods.

### 2. Online Bookstore Order System (`/Online Bookstore Order System`)
An e-commerce order management system fulfilling all lab case study tasks:
- **Task 1:** Catalog inventory and order queue modeling using ES6 classes, objects, and deliberate variable choices.
- **Task 2:** Order validation testing stock availability, non-zero quantities, and valid IDs without runtime errors.
- **Task 3:** Batch order processing using a `for...of` loop to adjust stock levels and calculate revenue via `.reduce()`.
- **Task 4:** Object destructuring and template literal formatting for order confirmations.
- **Task 5:** Multi-criteria low-stock category reporting combining `.filter()`, logical `&&`, and `.sort()`.

---

## 🛠️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/CaptainFlip16/Full-stack-lab-04.git](https://github.com/CaptainFlip16/Full-stack-lab-04.git)
   ```
2. **Navigate into the directory:**
   ```bash
   cd Full-stack-lab-04
   ```
3. Open `Student Result Dashboard/index.html` or `Online Bookstore Order System/index.html` directly in any web browser or use VS Code's **Live Server** extension.
4. Press `F12` to open **Developer Tools** and select the **Console** tab to view hoisting logs, warm-up output logs, and execution reports.

---

## 👤 Author

**Name:** Muhammad Ahmad Shafique  
**Student ID:** 241829
