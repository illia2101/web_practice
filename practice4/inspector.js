// ============================================================
// Завдання 1 — DOM-аналізатор
// ============================================================
// 6 функцій. Не змінюйте HTML.
// Обмеження:
//   - жодного for циклу (map/filter/reduce/forEach)
//   - жодного innerHTML (читання тексту через textContent)
//   - кожна функція обробляє "нічого не знайдено" — повертає [] або null,
//     НЕ кидає помилку
// ============================================================

/**
 * Кількість слів у textContent елемента, заданого селектором.
 * Враховує trim, кілька пробілів, табуляції.
 * countWordsIn("#post-1") // ≈ 30
 * countWordsIn("#missing") // 0
 */
function countWordsIn(selector) {
  const element = document.querySelector(selector);
  if (!element) {
  return 0;
}
const text = element.textContent;
const words = text.trim().split(/\s+/);
return words.length;
}

/**
 * Усі посилання, з ознакою external (інший origin).
 * [{ text, href, isExternal }, ...]
 */
function allLinks() {
    const links = document.querySelectorAll("a");
  return Array.from(links).map(link => ({
    text: link.textContent,
    href: link.href,
    isExternal: new URL(link.href).origin !== location.origin
  
}));
}

/**
 * <img> з проблемами:
 *   { src, reason: "no-alt" }      — атрибут alt відсутній
 *   { src, reason: "empty-alt" }   — alt="" але img інформативне
 *                                    (має width/height АБО всередині <figure>)
 */
function findOrphanImages() {
  const images = document.querySelectorAll("img");

  return Array.from(images).reduce((acc, img) => {
    const hasWidthHeight =
      img.hasAttribute("width") ||
      img.hasAttribute("height");

    const isInsideFigure =
      img.closest("figure") !== null;

    // alt немає взагалі
    if (!img.hasAttribute("alt")) {
      acc.push({
        src: img.src,
        reason: "no-alt"
      });
    }

    // alt="" але картинка інформативна
    else if (
      img.getAttribute("alt") === "" &&
      (hasWidthHeight || isInsideFigure)
    ) {
      acc.push({
        src: img.src,
        reason: "empty-alt"
      });
    }

    return acc;
  }, []);
}

/**
 * Outline документа — усі h1-h6 у порядку появи.
 * [{ level: 1, text: "..." }, { level: 2, text: "..." }, ...]
 *
 * Якщо рівень стрибає (h2 → h4), додати warning:
 *   { level: 4, text: "...", warning: "h4 after h2" }
 */
function getHeadingsOutline() {
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  let previousLevel = 0;
  return Array.from(headings).map(heading=>{
    const level = Number(heading.tagName[1]);
    const item = {
  level: level,
  text: heading.textContent
};
if (level - previousLevel > 1){
    item.warning = `h${level} after h${previousLevel}`;
   
}
previousLevel = level;
return item;
  })
}

/**
 * Серед елементів, що матчать селектор, повертає найглибше вкладений
 * (з максимальною кількістю предків). При нічиї — перший.
 * Якщо нічого не знайдено — null.
 */
function findDeepest(selector) {
  
}

/**
 * Топ-N найчастіших слів у елементі.
 * Ігнорувати: регістр, пунктуацію, слова коротші 3 символів.
 * [{ word: "семантика", count: 4 }, { word: "html", count: 2 }, ...]
 */
function wordFrequency(selector, n = 10) {
  // TODO
}

// ============================================================
// Тестування
// ============================================================
 console.log("Слів у post-1:", countWordsIn("#post-1"));
 console.log("Посилання:", allLinks());
 console.log("Проблемні img:", findOrphanImages());
console.log("Outline:", getHeadingsOutline());
// console.log("Найглибше .highlight:", findDeepest(".highlight"));
// console.log("Топ слів у post-1:", wordFrequency("#post-1", 5));