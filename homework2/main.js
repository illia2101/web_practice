const products = [
  { name: "Помідори", quantity: 2, bought: true },
  { name: "Печиво", quantity: 2, bought: false },
  { name: "Сир", quantity: 1, bought: false },
];
const productsList = document.querySelector(".products");
function renderProducts() {
  productsList.innerHTML = "";
  products.forEach(function (product) {
    const li = document.createElement("li");
    li.classList.add("product-item");
    li.innerHTML = `
  <span class="product-name">
    ${product.name}
  </span>

  <div class="counter">
    <button class="decrease">-</button>

    <span class="quantity">
      ${product.quantity}
    </span>

    <button class="increase">+</button>
  </div>
`;
    productsList.append(li);
  });
}
renderProducts();
