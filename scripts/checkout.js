import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

import '../data/cart-class.js'; // This runs all the codes inside the file , without importing anyhting
import "../data/backend-pratice.js";

renderOrderSummary();
renderPaymentSummary();
renderCheckoutHeader();
