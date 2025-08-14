export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  let matchingProductFound = false;

  cart.forEach((item) => {
    if (productId === item.productId) {
      item.quantity += quantity;
      matchingProductFound = true;
    }
  });

  if (!matchingProductFound) {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToStorage();
  console.log("cart", cart);
}

export function updateQauntity(productId, quantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = quantity;
    }
  });
  saveToStorage();
  console.log("cart now", cart);
}

export function updateCartQuantity() {
  let totalCartQuantity = 0;

  cart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });

  return totalCartQuantity;
}
