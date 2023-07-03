import products from './products.js';
import { renderCartProducts } from '../app.js';

// initial cart state
let cart = [];

// item add to cart
export const addToCart = (productId, quantity = 1) => {
    const product = products.find((pro) => pro.id === parseInt(productId));

    if (!product) {
        return;
    }

    const cartItem = cart.find((item) => item.product.id === parseInt(productId));

    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    renderCartProducts(); 
}
 
// increase quantity to the cart
export const increaseCartItemQuantity = (productId) => {
    const cartItem = cart.find((item) => item.product.id === parseInt(productId));
    if (cartItem) {
        cartItem.quantity++;
        renderCartProducts();
    }
}

// decrease quantity to the cart
export const decreaseCartItemQuantity = (productId) => {
    const cartItem = cart.find((item) => item.product.id === parseInt(productId));
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            // If quantity becomes zero, remove the item from the cart
            const index = cart.findIndex((item) => item.product.id === parseInt(productId));
            cart.splice(index, 1);
        }
        renderCartProducts();
    }
}

// Remove individual item from the cart
export const removeCartItem = (productId) => {
    const index = cart.findIndex((item) => item.product.id === parseInt(productId));
    if (index !== -1) {
        cart.splice(index, 1);
        renderCartProducts();
    }
}

export default cart;
