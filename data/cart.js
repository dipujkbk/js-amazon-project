export const cart = [];

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
}
