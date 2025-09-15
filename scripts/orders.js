import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "./utils/money.js";

function renderOrders() {
  let ordersHTML = ``;

  console.log("Orders>>", orders);

  orders.forEach((order) => {
    if (order?.products && order?.products?.length > 0) {
      const products = order.products;
      console.log("Products in array::", products);
      let productsHTML = ``;

      if (products && products?.length > 0) {
        products.forEach((product) => {
          const productId = product.productId;
          console.log("productId>>>", productId);
          const matchingProduct = getProduct(productId);
          console.log("Matched product>>", matchingProduct);

          productsHTML += `<div class="order-details-grid">
            <div class="product-image-container">
              <img src= "${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${getDeliverDateString(
                  product.estimatedDeliveryTime
                )}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${
                order.id
              }&productId=${productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>`;
        });
      }

      ordersHTML += `
    <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${getDeliverDateString(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
          ${productsHTML}
        </div>`;
    }
  });

  document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
}

async function loadPage() {
  await loadProductsFetch();
  renderOrders();
}

loadPage();

//function to get the delivery date
function getDeliverDateString(dateString) {
  return dayjs(dateString).format("MMMM D");
}
