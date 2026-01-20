import { menuArray } from "./data.js";
import { renderMenu } from "./functions/renderMenu.js";
import { renderHeader } from "./functions/renderHeader.js";
import {
  addToCart,
  removeItem,
  renderCart,
  cart,
} from "./functions/handleCart.js";
import { svg } from "./image/svg.js";

const orderForm = document.getElementById("order-form");

const header = (document.getElementById("header-container").innerHTML =
  renderHeader());

const menu = (document.getElementById("menu").innerHTML +=
  renderMenu(menuArray));

const documentEvent = document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    addToCart(e.target.dataset.id);
  } else if (e.target.dataset.removeid) {
    removeItem(e.target.dataset.removeid);
  } else if (e.target.className === "order-btn") {
    document.getElementById("form-section-wrapper").classList.remove("hidden");
  } else if (e.target.className === "cancel-btn") {
    document.getElementById("form-section-wrapper").classList.add("hidden");
  }
});

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const orderFormData = new FormData(orderForm);
  const fullName = orderFormData.get("fullName");
  const formSectionEl = document.querySelector(".form-section");
  const formSectionWrapper = document.getElementById("form-section-wrapper");
  const formHtmlEl = `
        <section class="form-section">
          <form id="order-form" class="form">
            <h3>Enter card details</h3>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your name"
              required
            />

            <input
              pattern="^[0-9]+$"
              maxlength="12"
              type="text"
              name="cardNumber"
              placeholder="Enter card number"
              required
            />

            <input
              type="text"
              pattern="^[0-9]+$"
              maxlength="3"
              name="cvvNUmber"
              placeholder="Enter CVV"
              required
            />
            <button type="submit" class="pay-btn" id="pay-btn">Pay</button>
            <button class="cancel-btn" class="cancel-btn" id="cancel-btn">
              Cancel
            </button>
          </form>
        </section>
       `;

  setTimeout(() => {
    formSectionEl.innerHTML = `
              <p class="processing">Progressin your payment ${fullName}
              ${svg}
              `;
  }, 500);

  setTimeout(() => {
    formSectionEl.innerHTML = `
    <p class="processing">Payment successfully completed.</p>`;
  }, 3000);

  setTimeout(() => {
    document.getElementById("form-section-wrapper").classList.add("hidden");
    document.getElementById("cart").innerHTML = `
        <div class="ty-div">
            <p class="ty-para">
                Thanks, ${fullName}!Your order is on it's way!
            </p>
        </div>`;
    formSectionWrapper.innerHTML = formHtmlEl;
    cart.pop();
    orderFormData.delete("fullName");
  }, 4000);
});
