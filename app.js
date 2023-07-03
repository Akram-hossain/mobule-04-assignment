import products from './modules/products.js';
import { renderProducts } from './modules/products-render.js';
import cart, { addToCart, removeCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } from './modules/cart.js';

// product display
renderProducts(products);

// show messages for empty cart
let showMessage = document.getElementById("showMessages");
const updateMessage = () => {
    if (cart.length === 0) {
        showMessage.innerText = "Cart is empty!";
    } else {
        showMessage.innerText = "";
    }
}
showMessage.innerText = "Cart is empty!";

// cart items display
export const renderCartProducts = () => {
    const cartItemsContainer = document.querySelector("#cartProducts");
    cartItemsContainer.innerHTML = "";
    let totalAmount = 0;

    cart.map((cartItem) => {
        const { product, quantity } = cartItem;
        const itemTotal = product.price * quantity;
        totalAmount += itemTotal;

        const itemElement = document.createElement("div");
        itemElement.innerHTML = `
        <div class="cart-item">
            <div class="media">
            <img src="${product.thumbnail}" alt="Thumbnail"
                class="img-fluid">
            <div class="media-body">
                <h5>${product.name}</h5>
                <h6>Price: $ ${product.price}</h6>
            </div>
            </div>
            <div class="quantity">
            <h5>Quantity</h5>
            <h6><a href="#" class="decreaseItem" data-id="${product.id}"><i class="fas fa-minus"></i></a> ${quantity} 
            <a href="#" class="increaseItem" data-id="${product.id}"><i class="fas fa-plus"></i></a> </h6>
            </div>
            <div class="quantity">
            <h5>Item Total</h5>
            <h6>${itemTotal}</h6>
            </div>
            <div class="close-cart">
                <a href="#" class="remove-item" data-id="${product.id}"><i class="fas fa-close"></i></a>
            </div>
        </div>
      `;

        // Increase quantity event listener
        const increaseItemLinks = itemElement.querySelectorAll(".increaseItem");
        increaseItemLinks.forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const productId = this.getAttribute("data-id");
                increaseCartItemQuantity(productId);
            });
        });

        // Decrease quantity event listener
        const decreaseItemLinks = itemElement.querySelectorAll(".decreaseItem");
        decreaseItemLinks.forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const productId = this.getAttribute("data-id");
                decreaseCartItemQuantity(productId);
                updateMessage();
            });
        });

        // Remove item event listener
        const removeItemLinks = itemElement.querySelectorAll(".remove-item");
        removeItemLinks.forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                const productId = this.getAttribute("data-id");
                removeCartItem(productId);
                updateMessage();
            });
        });

        cartItemsContainer.appendChild(itemElement);
    });

    const cartPriceContainer = document.querySelector(".cart-price-box");
    cartPriceContainer.innerHTML = `
            <div class="d-flex">
            <h5>Total Amount:</h5>
            <h5>$${totalAmount}</h5>
        </div>
    `;
}

// handle clear all cart items
const handleClearCart = () => {
    cart.splice(0, cart.length);
    renderCartProducts();
    updateMessage();
}

// handle event listner 
const attachEventListeners = () => {
    // add to cart action
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id");
            addToCart(productId);
            updateMessage();
        });
    });

    // clear whole cart action
    const clearCartButton = document.getElementById('emptyAllCarts');
    clearCartButton.addEventListener('click', handleClearCart);

}

// trigger action after DOM is fully prepared
document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
});