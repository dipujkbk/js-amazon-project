// In OOP , to create/generate objects , the function name should use PascalCase

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    // we can also write like

    /**
     * loadFromStorage(){
     *    content inside
     * }
     */

    //Dont use arrow function here

    loadFromStorage: function () {
      // cart.cartItems = JSON.parse(localStorage.getItem("cart-oop")) || [];

      // If the name of the variable changes for the outer object , then this code will fail
      // So for generic , we will use "this"-->It alwways gives us the outer object
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

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
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(
        (cartItem) => cartItem.productId !== productId
      );
      this.aveToStorage();
      console.log("cart", this.cartItems);
    },

    updateQauntity(productId, quantity) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = quantity;
        }
      });
      this.saveToStorage();
      console.log("cart now", this.cartItems);
    },

    updateCartQuantity() {
      let totalCartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
        totalCartQuantity += cartItem.quantity;
      });

      return totalCartQuantity;
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  };

  return cart;
}

const normalCart = Cart('cart-oop');
const businessCart = Cart('cart-business');

normalCart.loadFromStorage();

normalCart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
console.log("normalCart>>", normalCart);

console.log("businessCart>>", businessCart);

// The benifit of OOP
/**
 * To create multiple objects
 */
