// ============================================================
// Завдання 5 — To-do список
// ============================================================
// Структура li для додавання:
//
//   <li>
//     <input type="checkbox">
//     <span class="task-text">Назва задачі</span>
//     <button class="delete">×</button>
//   </li>
//
// Вимоги:
//   1. Submit форми → додає <li>. preventDefault!
//   2. Інпут очищається після додавання.
//   3. Валідація: пропускати порожні і "лише пробіли".
//   4. Чекбокс → клас .done на <li>.
//   5. .delete → видаляє свій <li>.
//   6. #counter оновлюється: "X з Y завершено".
//   7. #clear-done → видаляє всі li.done.
//   8. EVENT DELEGATION для кліків у #task-list.
// ============================================================

// TODO

const form = document.getElementById("add-form");
const input = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("counter");
const clearDone = document.getElementById("clear-done");

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `
  <input type="checkbox">
<span class="task-text">${taskText}</span>
<button class="delete">×</button>
`;
taskList.append(li);
input.value = "";
updateCounter();
});
taskList.addEventListener("click", (event)=> {
if(event.target.classList.contains("delete")){
    const li = event.target.closest("li");
    li.remove();
    updateCounter();
}
if (event.target.type === "checkbox") {
    const li = event.target.closest("li");
    li.classList.toggle("done");
    updateCounter();
}
});
function updateCounter() {
const total = taskList.querySelectorAll("li").length;
const done = taskList.querySelectorAll("li.done").length;
counter.textContent = `${done} з ${total} завершено`;
}
clearDone.addEventListener("click",(event)=>{
    const allTasks = taskList.querySelectorAll("li.done");
    allTasks.forEach((task) => {
    task.remove();
});
updateCounter();
});