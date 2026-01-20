import { menuArray } from "../data.js";
const cartSection = document.getElementById("cart");
export let cart = [];

export function addToCart(itemId) {
  const selectedMenuItem = menuArray.filter((item) => {
    return parseInt(itemId) === parseInt(item.id);
  })[0];

  if (!cart.includes(selectedMenuItem)) {
    cart.push(selectedMenuItem);
    selectedMenuItem.isSelected = true;
    selectedMenuItem.quantity = 1;
  } else {
    selectedMenuItem.quantity++;
  }
  renderCart(cart);
}

function renderCart(cart) {
  const totalPrice = cart.reduce(
    (total, menu) => total + menu.price * menu.quantity,
    0
  );
  let htmlEL = "";
  let finalOrder = "";
  if (cart.length > 0) {
    cart.map((menu) => {
      const { name, price, quantity, id } = menu;
      return (htmlEL += `
      <div class="cart-item">
        <div class="item-name">${name}</div>
        <div class="item-quantity">x${quantity}</div> 
        <button class="remove-btn" data-removeid="${id}">remove</button>
        <div class="item-price">$${price * quantity}</div>
      </div>
      `);
    });
    finalOrder = `
    <h2 class='order-header'>your order</h2>
    <div class="cart-item-wrapper">${htmlEL}</div>
    <div class="total-price-wrapper">
      <p class="total-price-text">Total Price:</p>
      <p class="total-price">$${totalPrice}</p>
    </div>
    <button class="order-btn">Complete Order</button>
    `;
  }
  cartSection.innerHTML = finalOrder;
}

export function removeItem(itemId) {
  const selectedCartItem = menuArray.filter((item) => {
    return parseInt(itemId) === parseInt(item.id);
  })[0];
  const index = cart.indexOf(selectedCartItem);
  if (index > -1) {
    cart.splice(index, 1);
  }
  renderCart(cart);
}
