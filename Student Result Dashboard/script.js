// --- 1. Variables (var, let, const) & Scope Explanation ---
const DASHBOARD_TITLE = "Student Result Dashboard";
let currentFilter = "all";
let searchTerm = "";
let currentSort = "id";

document.title = DASHBOARD_TITLE;

// --- 2. Hoisting Demonstration ---
console.log("Hoisted var value before assignment:", hoistedVar);
var hoistedVar = "I am hoisted!";

// --- 3. ES6 Class Modeling ---
class Student {
  constructor(id, name, subject, marks) {
    this.id = id;
    this.name = name;
    this.subject = subject;
    this.marks = marks;
  }

  getGrade() {
    if (this.marks >= 90) return "A+";
    else if (this.marks >= 80) return "A";
    else if (this.marks >= 70) return "B";
    else if (this.marks >= 50) return "C";
    else return "F";
  }

  getStatus() {
    return this.marks >= 50 ? "pass" : "fail";
  }
}

// --- 4. Objects & Array of Objects (Single Source of Truth) ---
const rawStudentsData = [
  { id: 1, name: "Ayesha Khan", subject: "Web Development", marks: 88 },
  { id: 2, name: "Bilal Ahmed", subject: "Web Development", marks: 45 },
  { id: 3, name: "Zainab Fatima", subject: "Web Development", marks: 92 },
  { id: 4, name: "Usman Raza", subject: "Web Development", marks: 38 },
  { id: 5, name: "Hamza Malik", subject: "Web Development", marks: 76 },
  { id: 6, name: "Sana Tariq", subject: "Web Development", marks: 64 },
];

const students = rawStudentsData.map(
  (s) => new Student(s.id, s.name, s.subject, s.marks)
);

// --- 5. Demonstrating Four Types of Loops ---
console.log("--- for...in Loop Example ---");
for (const key in students[0]) {
  console.log(`Property '${key}': ${students[0][key]}`);
}

console.log("--- Standard for Loop Example ---");
for (let i = 0; i < students.length; i++) {
  console.log(`${i + 1}. ${students[i].name} (${students[i].marks})`);
}

console.log("--- for...of Loop Example ---");
for (const student of students) {
  console.log(`Student: ${student.name} | Status: ${student.getStatus().toUpperCase()}`);
}

// --- 6. Helper & Formatting Functions ---
function formatMarks(marks) {
  return `${marks} / 100`;
}

const toPercentage = (value, total) => `${((value / total) * 100).toFixed(1)}%`;

// --- 7. Dashboard Calculation & DOM Rendering Logic ---
function updateSummaryStats(filteredList) {
  if (filteredList.length === 0) {
    document.getElementById("classAverage").textContent = "0%";
    document.getElementById("topScorer").textContent = "None";
    document.getElementById("topScorerMarks").textContent = "Marks: -";
    document.getElementById("passCount").textContent = "0 / 0";
    document.getElementById("passPercentage").textContent = "0% passing";
    document.getElementById("failCount").textContent = "0";
    return;
  }

  const totalMarks = filteredList.reduce((sum, s) => sum + s.marks, 0);
  const average = (totalMarks / filteredList.length).toFixed(1);
  document.getElementById("classAverage").textContent = `${average}%`;

  const topStudent = filteredList.reduce(
    (max, s) => (s.marks > max.marks ? s : max),
    filteredList[0]
  );
  document.getElementById("topScorer").textContent = topStudent.name;
  document.getElementById("topScorerMarks").textContent = `Marks: ${topStudent.marks}`;

  const passedStudents = filteredList.filter((s) => s.getStatus() === "pass");
  const failedStudents = filteredList.filter((s) => s.getStatus() === "fail");

  document.getElementById("passCount").textContent = `${passedStudents.length} / ${filteredList.length}`;
  document.getElementById("passPercentage").textContent = `${toPercentage(passedStudents.length, filteredList.length)} passing`;
  document.getElementById("failCount").textContent = failedStudents.length;
}

function createStudentCard(student) {
  const { name, subject, marks } = student;
  const status = student.getStatus();
  const grade = student.getGrade();

  const card = document.createElement("div");
  card.className = `student-card ${status}`;

  card.innerHTML = `
    <div class="card-header">
      <div>
        <h3 class="student-name">${name}</h3>
        <p class="student-subject">${subject}</p>
      </div>
      <span class="badge ${status}">${status}</span>
    </div>
    <div class="card-metrics">
      <div>
        <span style="font-size:0.75rem; color:#64748b; display:block;">Score</span>
        <span class="metric-val">${formatMarks(marks)}</span>
      </div>
      <div>
        <span style="font-size:0.75rem; color:#64748b; display:block;">Grade</span>
        <span class="grade-badge">${grade}</span>
      </div>
    </div>
  `;
  return card;
}

function renderDashboard() {
  const cardsGrid = document.getElementById("cardsGrid");
  cardsGrid.innerHTML = "";

  let result = students.filter((student) => {
    const matchesFilter =
      currentFilter === "all" || student.getStatus() === currentFilter;
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  result.sort((a, b) => {
    if (currentSort === "marks-desc") return b.marks - a.marks;
    if (currentSort === "marks-asc") return a.marks - b.marks;
    if (currentSort === "name") return a.name.localeCompare(b.name);
    return a.id - b.id;
  });

  updateSummaryStats(result);

  for (const student of result) {
    cardsGrid.appendChild(createStudentCard(student));
  }
}

// --- 8. Event Listeners Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      currentFilter = e.target.getAttribute("data-filter");
      renderDashboard();
    });
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchTerm = e.target.value.trim();
    renderDashboard();
  });

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderDashboard();
  });

  renderDashboard();
});

// ============================================================================
// WARM-UP TASKS SOLUTIONS
// ============================================================================

// Task 1: Change one student's marks in studentsData and confirm UI updates
rawStudentsData[1].marks = 82;
students[1].marks = 82;
console.log("Warmup Task 1: Updated Bilal's marks to 82.");

// Task 2: Add console.log inside getGrade() printing returning grade
Student.prototype.getGrade = function() {
  let grade;
  if (this.marks >= 90) grade = "A+";
  else if (this.marks >= 80) grade = "A";
  else if (this.marks >= 70) grade = "B";
  else if (this.marks >= 50) grade = "C";
  else grade = "F";

  console.log(`[getGrade Log] Student: ${this.name} | Grade: ${grade}`);
  return grade;
};

console.log("--- Warmup Task 2 Execution ---");
students.forEach(s => s.getGrade());

// Task 3: Use a for...of loop to print name and pass/fail status
console.log("--- Warmup Task 3: for...of Loop Output ---");
for (const student of students) {
  console.log(`Name: ${student.name} -> Status: ${student.getStatus()}`);
}

// Task 4: Filter failed students, then map to extract only their names
console.log("--- Warmup Task 4: Failed Students Names ---");
const failedStudents = students.filter(s => s.getStatus() === "fail");
const failedNames = failedStudents.map(s => s.name);

console.log("Failed Students Object List:", failedStudents);
console.log("Failed Student Names List:", failedNames);