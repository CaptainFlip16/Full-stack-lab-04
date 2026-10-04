// --- Task 4: Organize the System with an ES6 Class ---
class Book {
  constructor(id, title, author, price, stock, category) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.stock = stock;
    this.category = category;
  }

  isLowStock(threshold = 5) {
    return this.stock < threshold ? true : false;
  }
}

// --- Task 1: Model the Catalog and Orders (Variables, Objects, Arrays) ---
const catalog = [
  new Book(101, "Clean Code", "Robert C. Martin", 45.00, 8, "Programming"),
  new Book(102, "JavaScript: The Good Parts", "Douglas Crockford", 30.00, 2, "Programming"),
  new Book(103, "Design Patterns", "Erich Gamma", 55.00, 4, "Design"),
  new Book(104, "Refactoring", "Martin Fowler", 50.00, 1, "Programming"),
  new Book(105, "SQL Antipatterns", "Bill Karwin", 40.00, 6, "Database"),
];

let pendingOrders = [
  { orderId: "ORD-001", bookId: 101, quantity: 2 },
  { orderId: "ORD-002", bookId: 102, quantity: 5 },
  { orderId: "ORD-003", bookId: 999, quantity: 1 },
  { orderId: "ORD-004", bookId: 104, quantity: -1 },
  { orderId: "ORD-005", bookId: 103, quantity: 3 },
];

var totalSystemRevenue = 0;

// --- Task 2: Validate a Single Order (Conditions, Operators, Ternary Operator) ---
function validateOrder(order) {
  const book = catalog.find((b) => b.id === order.bookId);

  const bookExists = book !== undefined;
  const validQuantity = order.quantity > 0;
  const hasEnoughStock = bookExists && book.stock >= order.quantity;

  const isValid = bookExists && validQuantity && hasEnoughStock;

  const statusMessage = !bookExists
    ? `Error: Book ID ${order.bookId} does not exist.`
    : !validQuantity
    ? `Error: Quantity must be greater than zero.`
    : !hasEnoughStock
    ? `Rejected: Stock insufficient (${book.stock} available, ${order.quantity} requested).`
    : `Valid: Stock available (${book.stock} in stock).`;

  return { isValid, statusMessage, book };
}

// --- Task 4 Format Confirmation Function (Destructuring & Template Literals) ---
function printOrderConfirmation(book, quantity) {
  const { title, price } = book;
  const totalCost = (price * quantity).toFixed(2);

  return `Order confirmed: ${quantity} x "${title}" — $${totalCost} total.`;
}

// --- Task 3: Process a Batch of Orders (Loops, Array Methods) ---
function processBatchOrders(ordersList) {
  const summaryReport = [];
  let batchRevenue = 0;

  for (const order of ordersList) {
    const validation = validateOrder(order);

    if (validation.isValid) {
      const book = validation.book;

      book.stock -= order.quantity;

      const orderTotal = book.price * order.quantity;
      batchRevenue += orderTotal;

      const confirmation = printOrderConfirmation(book, order.quantity);
      summaryReport.push({ orderId: order.orderId, status: "Fulfilled", message: confirmation, amount: orderTotal });
    } else {
      summaryReport.push({ orderId: order.orderId, status: "Rejected", message: validation.statusMessage, amount: 0 });
    }
  }

  const formattedLogs = summaryReport.map((r) => `[${r.status.toUpperCase()}] ${r.orderId}: ${r.message}`);

  const calculatedRevenue = summaryReport.reduce((acc, curr) => acc + curr.amount, 0);

  totalSystemRevenue += calculatedRevenue;

  return { formattedLogs, calculatedRevenue };
}

// --- Task 5: Low-Stock and Category Reporting (Combined Techniques) ---
function generateLowStockCategoryReport(categoryName, stockThreshold) {
  const filteredBooks = catalog.filter((book) => {
    return book.category === categoryName && book.isLowStock(stockThreshold);
  });

  filteredBooks.sort((a, b) => a.stock - b.stock);

  return filteredBooks;
}

function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  grid.innerHTML = "";

  catalog.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";

    const isLow = book.isLowStock(5);

    card.innerHTML = `
      <div>
        <h4>${book.title}</h4>
        <p>By ${book.author}</p>
        <p>Category: <strong>${book.category}</strong></p>
      </div>
      <div class="book-meta">
        <span>$${book.price.toFixed(2)}</span>
        <span class="${isLow ? 'badge-low' : 'badge-ok'}">
          Stock: ${book.stock} ${isLow ? '(Low)' : ''}
        </span>
      </div>
    `;
    grid.appendChild(card);
  });

  document.getElementById("catalogCount").textContent = catalog.length;
  document.getElementById("totalRevenue").textContent = `$${totalSystemRevenue.toFixed(2)}`;

  const totalLowStock = catalog.filter(b => b.isLowStock(5)).length;
  document.getElementById("lowStockAlert").textContent = `${totalLowStock} titles low on stock`;
}

function appendLog(message, type = "info") {
  const logsContainer = document.getElementById("logsOutput");

  if (logsContainer.querySelector(".placeholder-text")) {
    logsContainer.innerHTML = "";
  }

  const div = document.createElement("div");
  div.className = `log-entry log-${type}`;
  div.textContent = message;
  logsContainer.appendChild(div);
  logsContainer.scrollTop = logsContainer.scrollHeight;
}

document.getElementById("processBatchBtn").addEventListener("click", () => {
  if (pendingOrders.length === 0) {
    appendLog("No pending orders remaining to process.", "info");
    return;
  }

  appendLog("--- Starting Order Batch Execution ---", "info");
  const result = processBatchOrders(pendingOrders);

  result.formattedLogs.forEach((log) => {
    const isSuccess = log.includes("FULFILLED");
    appendLog(log, isSuccess ? "success" : "error");
  });

  appendLog(`Batch Completed. Batch Revenue: $${result.calculatedRevenue.toFixed(2)}`, "info");

  document.getElementById("ordersProcessedCount").textContent = pendingOrders.length;
  pendingOrders = [];
  renderCatalog();
});

document.getElementById("runReportBtn").addEventListener("click", () => {
  const category = document.getElementById("reportCategory").value;
  const threshold = parseInt(document.getElementById("reportThreshold").value, 10);

  appendLog(`--- Generating Low-Stock Report [Cat: ${category}, Threshold < ${threshold}] ---`, "info");

  const reportData = generateLowStockCategoryReport(category, threshold);

  if (reportData.length === 0) {
    appendLog(`No books found matching criteria.`, "error");
  } else {
    reportData.forEach((b) => {
      appendLog(`🚨 Urgent Restock: "${b.title}" — Stock: ${b.stock} left (Price: $${b.price.toFixed(2)})`, "error");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();

  console.log("--- Task 2 Self-Test ---");
  console.log("Valid Order Check:", validateOrder({ orderId: "TEST-1", bookId: 101, quantity: 1 }));
  console.log("Invalid Book Check:", validateOrder({ orderId: "TEST-2", bookId: 999, quantity: 1 }));
});