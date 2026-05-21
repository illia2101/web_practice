const savedProducts = localStorage.getItem("products");

const products = savedProducts
  ? JSON.parse(savedProducts)
  : [
      { name: "Помідори", quantity: 2, bought: true, editing: false },
      { name: "Печиво", quantity: 2, bought: false, editing: false },
      { name: "Сир", quantity: 1, bought: false, editing: false },
    ];
const productsList = document.querySelector(".products");
const remainingList = document.querySelector(".remaining-list");
const boughtList = document.querySelector(".bought-list");
function renderProducts() {
  productsList.innerHTML = "";
  products.forEach(function (product, index) {
    const li = document.createElement("li");
    li.classList.add("product-item");
    li.innerHTML = `
  ${
    product.editing
      ? `
  <input 
    type="text"
    class="edit-input"
    value="${product.name}"
  >
`
      : `
  <span class="product-name ${product.bought ? "bought" : ""}">
    ${product.name}
  </span>
`
  }

  ${
    product.bought
      ? `
      <div class="counter">
        <span class="quantity">
          ${product.quantity}
        </span>
      </div>
    `
      : `
      <div class="counter">
        <button
          class="decrease ${product.quantity === 1 ? "disabled" : ""}"
          ${product.quantity === 1 ? "disabled" : ""}
        >
          -
        </button>

        <span class="quantity">
          ${product.quantity}
        </span>

        <button class="increase">+</button>
      </div>
    `
  }
  <div class="actions">
  <button class="status-button">
    ${product.bought ? "Не куплено" : "Куплено"}
  </button>

  ${!product.bought ? `<button class="delete">✖</button>` : ""}
</div>

  
`;
    const increaseButton = li.querySelector(".increase");

    if (increaseButton) {
      increaseButton.addEventListener("click", function () {
        product.quantity++;
        saveProducts();
        renderProducts();
        renderStatistics();
      });
    }

    const decreaseButton = li.querySelector(".decrease");

    if (decreaseButton && product.quantity > 1) {
      decreaseButton.addEventListener("click", function () {
        product.quantity--;
        saveProducts();
        renderProducts();
        renderStatistics();
      });
    }

    const statusButton = li.querySelector(".status-button");
    statusButton.addEventListener("click", function () {
      product.bought = !product.bought;
      saveProducts();
      renderProducts();
      renderStatistics();
    });
    const productName = li.querySelector(".product-name");
    if (productName && !product.bought) {
      productName.addEventListener("click", function () {
        product.editing = true;
        saveProducts();
        renderProducts();
        renderStatistics();
      });
    }
    const editInput = li.querySelector(".edit-input");
    if (editInput) {
      editInput.addEventListener("blur", function () {
        if (editInput.value.trim()) {
          product.name = editInput.value;
        }
        product.editing = false;
        saveProducts();
        renderProducts();
        renderStatistics();
      });
    }
    const deleteButton = li.querySelector(".delete");
    if (deleteButton) {
      deleteButton.addEventListener("click", function () {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
        renderStatistics();
      });
    }

    productsList.append(li);
  });
}

renderProducts();
const addForm = document.querySelector(".add-form");
const productInput = document.querySelector("#product-name");
addForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (productInput.value.trim()) {
    products.push({
      name: productInput.value,
      quantity: 1,
      bought: false,
      editing: false,
    });
    saveProducts();
    renderProducts();
    renderStatistics();
  }

  productInput.value = "";
  productInput.focus();
});
function renderStatistics() {
  remainingList.innerHTML = "";
  boughtList.innerHTML = "";
  products.forEach(function (product) {
    const badge = document.createElement("div");
    badge.classList.add("item-badge");
    badge.innerHTML = `
  <span class="${product.bought ? "bought" : ""}">
    ${product.name}
  </span>

  <span class="badge-count">
    ${product.quantity}
  </span>
`;
    if (!product.bought) {
      remainingList.append(badge);
    } else {
      boughtList.append(badge);
    }
  });
}
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}
renderStatistics();
