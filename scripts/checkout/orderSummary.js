import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateQauntity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { calculateDeliveryDate } from "../../data/deliveryOptions.js";

/**
 * This syntax is called Named export
 */

import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
/**
 * this syntax is called default export
 * it is another way of exporting
 * we can use it, when we only want to export 1 thing and that import thing must have been defaultly exported
 * In one file, there can only one default export
 * like in money.js file we can write --- export default formatCurrency;
 *
 */

//calling from extenal libary
// hello();

// const today = dayjs();
// const deliveryDate = today.add(7, "day");
// console.log(deliveryDate);
// console.log(deliveryDate.format("dddd, MMMM D"));

// To update the page we are moving this into the function

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    console.log("matching product ", matchingProduct);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
    <div class="cart-item-container 
            js-cart-item-container
            js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${productId}" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(cartItem)}
              </div>
            </div>
          </div>
    
    `;
  });
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      console.log("link product id ", productId);
      removeFromCart(productId);
      //   document.querySelector(`.js-cart-item-container-${productId}`).remove();

      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();
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
    link.addEventListener("click", () => {
      handleUpdateQuantity(productId, quantityInput);
    });

    //keydown event
    quantityInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleUpdateQuantity(productId, quantityInput);
      }
    });
  });

  function handleUpdateQuantity(productId, quantityInput) {
    const quantity = Number(quantityInput.value);

    if (quantity < 1 || quantity >= 1000) {
      alert("Quantity must be at least 1 and less than 1000");
      return;
    }
    updateQauntity(productId, quantity);

    const editingProductElement = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    editingProductElement.classList.remove("is-editing-quantity");

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      quantity;

    renderPaymentSummary();
    renderCheckoutHeader();
  }

  function deliveryOptionsHTML(cartItem) {
    let deliveryHtml = "";
    deliveryOptions.forEach((option) => {
      const dateString = calculateDeliveryDate(option);

      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(option.priceCents)} - `;

      const isChecked = option.id === cartItem.deliveryOptionId;

      deliveryHtml += `
    <div class="delivery-option js-delivery-option" 
    data-product-id = ${cartItem.productId}
    data-delivery-option-id = ${option.id}
    >
        <input type="radio" ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${cartItem.productId}"
            value="${dateString}"
            >
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
    </div>
    
    `;
    });

    return deliveryHtml;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;

      updateDeliveryOption(productId, deliveryOptionId);

      // reload the page using calling the function
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

/**
 * This update the data and Regenrate all the html is called MVC
 * Model-View-Controller
 * We split our code into 3 parts
 * 1. Model = saves and manages the data , here data.js
 * 2. View = takes the data and displays it on the page, here checkout.js
 * 3. Controller = runs some when we interact with the view, here add event listeners
 * */
