// ============================================================
// Завдання 3 — Перемикач тем
// ============================================================
// Вимоги:
//   1. Toggle: додати/прибрати data-theme="dark" на <body>.
//   2. Текст кнопки: "🌙 Темна тема" ↔ "☀️ Світла тема".
//   3. Зберігати тему в localStorage.
//   4. При завантаженні відновлювати з localStorage.
//   5. Якщо localStorage порожній — взяти системну тему через
//      window.matchMedia('(prefers-color-scheme: dark)').
//   6. CSS transition додати в style (на body).
// ============================================================

// TODO
const button = document.getElementById("theme-toggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");
if(savedTheme == "dark"){
    body.setAttribute("data-theme", "dark");
    button.textContent = "☀️ Світла тема";

}else {

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
body.setAttribute("data-theme", "dark");
button.textContent = "☀️ Світла тема";
    }
}
button.addEventListener("click", function() {
    if(body.getAttribute("data-theme") == "dark" ){
        body.removeAttribute("data-theme");
        button.textContent = "🌙 Темна тема";
        localStorage.setItem("theme", "light");
    }else{
        button.textContent = "☀️ Світла тема";
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
});