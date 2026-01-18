import { menuArray } from "./data.js";
import { renderMenu } from "/functions/renderMenu.js";
import { renderHeader } from "/functions/renderHeader.js";
import { addToCart, removeItem } from "./functions/handleCart.js";

const header = (document.getElementById("header-container").innerHTML =
  renderHeader());

const menu = (document.getElementById("menu").innerHTML +=
  renderMenu(menuArray));

document.addEventListener("click", (e) => {
  if (e.target.id) {
    addToCart(e.target.id);
  } else if (e.target.dataset.removeid) {
    removeItem(e.target.dataset.removeid);
  }
});
