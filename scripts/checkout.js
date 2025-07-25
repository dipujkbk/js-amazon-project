import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateQauntity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  matchingProduct = products.filter((product) => product.id === productId)[0];
  console.log("matching product ", matchingProduct);

  cartSummaryHTML += `
    <div class="cart-item-container 
            js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${productId}">${
    cartItem.quantity
  }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${productId}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${productId}">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${productId}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
    `;
});
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

function checkoutItemsUpdate() {
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${updateCartQuantity()} items`;
}

checkoutItemsUpdate();

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    console.log("link product id ", productId);
    removeFromCart(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    checkoutItemsUpdate();
  });
});

document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    console.log("link product id ", productId);
    const editingProductElement = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    editingProductElement.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-link").forEach((link) => {
    const { productId } = link.dataset;
    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );

    //click event
    link.addEventListener('click', ()=>{
      handleUpdateQuantity(productId, quantityInput);
    })

    //keydown event
    quantityInput.addEventListener('keydown', (event)=>{
      if (event.key === 'Enter') {
        handleUpdateQuantity(productId, quantityInput);
      }
    })

})


function handleUpdateQuantity(productId, quantityInput) {
  const quantity = Number(quantityInput.value);

    if (quantity < 1 || quantity >= 1000) {
        alert('Quantity must be at least 1 and less than 1000');
        return;
    }
    updateQauntity(productId, quantity);

    const editingProductElement = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    editingProductElement.classList.remove("is-editing-quantity");

    checkoutItemsUpdate();

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      quantity;
}
