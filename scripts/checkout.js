import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

import { loadProducts } from "../data/products.js";

import "../data/cart-class.js"; // This runs all the codes inside the file , without importing anyhting
// import "../data/backend-pratice.js";

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});

//Promises

/**
 * Better way to handle asynchronous code
 * Similar to done() function
 * Let us wait for some code to finish, before going to the next step
 * resolve and reject are the two functions
 */

new Promise((resolve) => {
  console.log("It runs the function immidiately");
  console.log("start promise");
  loadProducts(() => {
    console.log("finished loading");
    resolve("value1"); // it allwos to go to next step --> means in the then block
    console.log("after resolve");
  });
}).then((value) => {
  console.log("parameter passed from resolve");
  console.log("Next step");
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});

//Promise.all([]) -->takes array of promises
