// ============================================================
// Завдання 4 — Аккордеон
// ============================================================
// Вимоги:
//   1. Клік на .panel-title відкриває/закриває .panel-content
//      (додається/прибирається клас .open на .panel).
//   2. Одночасно відкрита ЛИШЕ ОДНА панель.
//   3. EVENT DELEGATION на .accordion.
//   4. КЛАВІАТУРА: Enter і Space на .panel-title (з tabindex=0).
//   5. ARIA: aria-expanded="true"/"false" оновлюється.
// ============================================================

// TODO
const accordion = document.querySelector(".accordion");
accordion.addEventListener("click", function(event){
    if (event.target.classList.contains("panel-title")) {
       const panel  =  event.target.closest(".panel");
       if(panel.classList.contains("open")){
        panel.classList.remove("open");
       }else{
        document.querySelectorAll(".panel").forEach(function(panel) {
panel.classList.remove("open");
});
        panel.classList.add("open");
       }

}

})