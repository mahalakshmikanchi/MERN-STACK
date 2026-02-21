// Select elements
const form = document.getElementById("note-form");
const input = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("theme-toggle");
const clearCompletedBtn = document.getElementById("clear-completed");
const modal = document.getElementById("modal");
const modalYes = document.getElementById("modal-yes");
const modalNo = document.getElementById("modal-no");

// Add Note
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className = "note";
  li.draggable = true;

  li.innerHTML = `
    <div class="text">${text}</div>
    <div class="actions">
      <button class="btn btn-complete">Complete</button>
      <button class="btn btn-delete">Delete</button>
      <input type="color" class="color-picker">
    </div>
  `;

  notesList.prepend(li);
  input.value = "";
});

// Event Delegation (Complete, Delete, Color, Edit)
notesList.addEventListener("click", function (e) {
  const note = e.target.closest(".note");
  if (!note) return;

  if (e.target.classList.contains("btn-delete")) {
    note.remove();
  }

  if (e.target.classList.contains("btn-complete")) {
    note.classList.toggle("completed");
  }
});

notesList.addEventListener("change", function (e) {
  if (e.target.classList.contains("color-picker")) {
    const note = e.target.closest(".note");
    note.style.backgroundColor = e.target.value;
  }
});

// Double-click to edit
notesList.addEventListener("dblclick", function (e) {
  if (e.target.classList.contains("text")) {
    const oldText = e.target.textContent;
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = oldText;
    inputEdit.style.padding = "6px";
    inputEdit.style.fontSize = "1rem";

    e.target.replaceWith(inputEdit);
    inputEdit.focus();

    inputEdit.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        const newDiv = document.createElement("div");
        newDiv.className = "text";
        newDiv.textContent = inputEdit.value;
        inputEdit.replaceWith(newDiv);
      }
    });
  }
});

// Drag & Drop
let draggedItem = null;

notesList.addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("note")) {
    draggedItem = e.target;
    e.target.classList.add("dragging");
  }
});

notesList.addEventListener("dragend", function (e) {
  if (e.target.classList.contains("note")) {
    e.target.classList.remove("dragging");
  }
});

notesList.addEventListener("dragover", function (e) {
  e.preventDefault();
  const afterElement = getDragAfterElement(notesList, e.clientY);
  if (afterElement == null) {
    notesList.appendChild(draggedItem);
  } else {
    notesList.insertBefore(draggedItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".note:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Live Search
searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();
  document.querySelectorAll(".note").forEach(note => {
    const text = note.querySelector(".text").textContent.toLowerCase();
    note.style.display = text.includes(value) ? "block" : "none";
  });
});

// Theme Toggle
themeToggle.addEventListener("click", function () {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");

  if (currentTheme === "dark") {
    html.setAttribute("data-theme", "light");
    themeToggle.textContent = "Dark Mode";
  } else {
    html.setAttribute("data-theme", "dark");
    themeToggle.textContent = "Light Mode";
  }
});

// Modal Logic
clearCompletedBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

modalNo.addEventListener("click", function () {
  modal.style.display = "none";
});

modalYes.addEventListener("click", function () {
  document.querySelectorAll(".note.completed").forEach(note => note.remove());
  modal.style.display = "none";
});

// Close modal when clicking outside
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
