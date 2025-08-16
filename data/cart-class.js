// In OOP , the class name should use PascalCase

class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    // let quantity = Number(
    //   document.querySelector(`.js-quantity-selector-${productId}`).value
    // );

    let matchingProductFound = false;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        // item.quantity += quantity;
        matchingProductFound = true;
      }
    });

    if (!matchingProductFound) {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );
    this.aveToStorage();
    console.log("cart", this.cartItems);
  }

  updateQauntity(productId, quantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = quantity;
      }
    });
    this.saveToStorage();
    console.log("cart now", this.cartItems);
  }

  updateCartQuantity() {
    let totalCartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      totalCartQuantity += cartItem.quantity;
    });

    return totalCartQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const normalCart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

normalCart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
console.log("normalCart>>", normalCart);

console.log("businessCart>>", businessCart);

console.log(businessCart instanceof Cart);

// Constructor
/**
 * The method has to be named "constructor"
 * should not return anything
 *
 */
