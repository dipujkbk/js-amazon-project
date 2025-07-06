export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage( ){
    localStorage.setItem('cart', JSON.stringify(cart));
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
      });
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    cart = cart.filter((cartItem)=>cartItem.productId !== productId);
    saveToStorage();
    console.log('cart', cart);
}