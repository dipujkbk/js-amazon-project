import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

import { loadProductsFetch } from "../data/products.js";

import "../data/cart-class.js"; // This runs all the codes inside the file , without importing anyhting
// import "../data/backend-pratice.js";

/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

//Promises

/**
 * Better way to handle asynchronous code
 * Similar to done() function
 * Let us wait for some code to finish, before going to the next step
 * resolve and reject are the two functions
 */

/*
loadProductsFetch().then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/
/*
new Promise((resolve) => {
  console.log("It runs the function immidiately");
  console.log("start promise");
  loadProducts(() => {
    console.log("finished loading");
    resolve("value1"); // it allwos to go to next step --> means in the then block
    console.log("after resolve");
  });
}).then((value) => {
  console.log("parameter passed from resolve", value);
  console.log("Next step");
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/
//Promise.all([]) -->takes array of promises

//async and await
/**
 * async = makes a function return a promise
 * async lets us use await
 * await  = lets us wait for a promise to finish, before going to next line
 * await = lets us write asynchronous code like normal code
 * we can only use await , when we are inside an async function
 */

//same as
/*
function loadPage() {
  return new Promise((resolve) => {
    console.log("load page");
    resolve();
  })
    .then(() => {
      return loadProductsFetch();
    })
    .then(() => {
      return new Promise((resolve) => {
        resolve("value2");
      });
    });
}
*/
async function loadPage() {
  try {
    console.log("load page");

    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
    return "value2"; // it's like resolve('value2');
  } catch (error) {
    console.log("error in try catch ", error);
  }
}

loadPage().then((value) => {
  console.log("next step in async load page");
  console.log("parameter from return ", value);
});

/**
 * More example
 */

async function outerFunction() {
  const value = await new Promise((resolve) => {
    console.log("Inside the outerfunction promise");
    resolve("value3"); // so whatever value will pass from the resolve , this will return it.
  });
  console.log("value from await", value);
}

outerFunction();
