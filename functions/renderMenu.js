export function renderMenu(arr) {
  let htmlEl = "";
  arr.forEach((item) => {
    const { emoji, name, ingredients, price, id } = item;
    return (htmlEl += `
      <div class="item-wrapper">
      <span class="emoji">${emoji}</span>
      <div class="text-wrapper">
      <h2 class="item-header">${name}</h2>
      <p class="item-ingredients">${ingredients}</p>
      <p class="item-price">$${price}</p>
      </div>
      <button class="button" data-id="${id}" id="${id}">+</button>
      </div>
      `);
  });
  return htmlEl;
}
