// ============================================================
// Завдання 2 — Лічильник напоїв з історією
// ============================================================

const STORAGE_KEY = "task-2-counters";
const HISTORY_LIMIT = 5;
const UNDO_LIMIT = 10;
const THROTTLE_MS = 200;

const counters = document.querySelector("#counters");
const totalElement = document.querySelector("#total");
const leaderElement = document.querySelector("#leader");
const historyElement = document.querySelector("#history");

const undoButton = document.querySelector("#undo");
const resetButton = document.querySelector("#reset");
const exportButton = document.querySelector("#export");

const history = [];
const undoStack = [];
const lastClick = {};

// ============================================================
// CLICK HANDLER
// ============================================================

counters.addEventListener("click", (event) => {
  const isPlus = event.target.classList.contains("plus");
  const isMinus = event.target.classList.contains("minus");

  if (!isPlus && !isMinus) {
    return;
  }

  const counter = event.target.closest(".counter");
  const name = counter.dataset.name;

  // throttle
  const now = Date.now();

  if (
    lastClick[name] &&
    now - lastClick[name] < THROTTLE_MS
  ) {
    return;
  }

  lastClick[name] = now;

  saveUndoState();

  const valueElement = counter.querySelector(".value");

  let value = Number(valueElement.textContent);

  if (isPlus) {
    value++;
    addHistory(`+1 ${name}`);
  }

  if (isMinus) {
    value = Math.max(0, value - 1);
    addHistory(`-1 ${name}`);
  }

  valueElement.textContent = value;

  updateTotal();
  updateLeader();
  saveState();
});

// ============================================================
// TOTAL
// ============================================================

function updateTotal() {
  const values = document.querySelectorAll(".value");

  const total = Array.from(values).reduce(
    (sum, valueElement) => {
      return sum + Number(valueElement.textContent);
    },
    0
  );

  totalElement.textContent = total;
}

// ============================================================
// LEADER
// ============================================================

function updateLeader() {
  const countersList =
    document.querySelectorAll(".counter");

  const data = Array.from(countersList).map(
    (counter) => {
      return {
        name: counter.dataset.name,
        value: Number(
          counter.querySelector(".value").textContent
        ),
      };
    }
  );

  const values = data.map((item) => item.value);

  const max = values.reduce((largest, current) => {
    return current > largest ? current : largest;
  }, 0);

  Array.from(countersList).forEach((counter) => {
    counter.classList.remove("is-leader");
  });

  if (max === 0) {
    leaderElement.textContent = "—";
    return;
  }

  const leaders = data.filter(
    (item) => item.value === max
  );

  Array.from(countersList).forEach((counter) => {
    const value = Number(
      counter.querySelector(".value").textContent
    );

    if (value === max) {
      counter.classList.add("is-leader");
    }
  });

  const leaderNames = leaders.map(
    (item) => item.name
  );

  leaderElement.textContent =
    leaderNames.join(", ");
}

// ============================================================
// LOCAL STORAGE
// ============================================================

function saveState() {
  const countersList =
    document.querySelectorAll(".counter");

  const state = {};

  Array.from(countersList).forEach((counter) => {
    const name = counter.dataset.name;

    const value = Number(
      counter.querySelector(".value").textContent
    );

    state[name] = value;
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );
}

function loadState() {
  const saved = localStorage.getItem(
    STORAGE_KEY
  );

  if (!saved) {
    return;
  }

  const state = JSON.parse(saved);

  const countersList =
    document.querySelectorAll(".counter");

  Array.from(countersList).forEach((counter) => {
    const name = counter.dataset.name;

    const valueElement =
      counter.querySelector(".value");

    valueElement.textContent = state[name];
  });
}

// ============================================================
// HISTORY
// ============================================================

function addHistory(text) {
  history.unshift(text);

  if (history.length > HISTORY_LIMIT) {
    history.pop();
  }

  renderHistory();
}

function renderHistory() {
  historyElement.innerHTML = "";

  history.forEach((item) => {
    const li = document.createElement("li");

    li.textContent = item;

    historyElement.append(li);
  });
}

// ============================================================
// UNDO
// ============================================================

function saveUndoState() {
  const countersList =
    document.querySelectorAll(".counter");

  const state = {};

  Array.from(countersList).forEach((counter) => {
    const name = counter.dataset.name;

    const value = Number(
      counter.querySelector(".value").textContent
    );

    state[name] = value;
  });

  undoStack.push(state);

  if (undoStack.length > UNDO_LIMIT) {
    undoStack.shift();
  }
}

undoButton.addEventListener("click", () => {
  const previousState = undoStack.pop();

  if (!previousState) {
    return;
  }

  const countersList =
    document.querySelectorAll(".counter");

  Array.from(countersList).forEach((counter) => {
    const name = counter.dataset.name;

    counter.querySelector(".value").textContent =
      previousState[name];
  });

  updateTotal();
  updateLeader();
  saveState();

  addHistory("undo");
});

// ============================================================
// RESET
// ============================================================

resetButton.addEventListener("click", () => {
  const confirmed = confirm(
    "Скинути всі лічильники?"
  );

  if (!confirmed) {
    return;
  }

  saveUndoState();

  const values = document.querySelectorAll(".value");

  Array.from(values).forEach((valueElement) => {
    valueElement.textContent = 0;
  });

  updateTotal();
  updateLeader();
  saveState();

  addHistory("reset");
});

// ============================================================
// EXPORT
// ============================================================

exportButton.addEventListener("click", () => {
  const saved = localStorage.getItem(
    STORAGE_KEY
  );

  const blob = new Blob([saved], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "counters.json";

  a.click();

  URL.revokeObjectURL(url);
});

// ============================================================
// INIT
// ============================================================

loadState();
updateTotal();
updateLeader();