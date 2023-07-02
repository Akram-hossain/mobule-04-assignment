import { products } from './modules/products.js'; 
import { renderProducts } from './modules/products-render.js'; 

// product render
renderProducts(products);

const cart = [];

// b) Adding Products to Cart
function addToCart(productId, quantity = 1) {
    const product = products.find((pro) => pro.id === parseInt(productId));

    if (!product) {
        console.log("Product not found!");
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


// Attach event listeners to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("product-id");
        addToCart(productId);
    });
});

// cart display
function renderCartProducts() {
    const cartItemsContainer = document.querySelector("#cartProducts");
    cartItemsContainer.innerHTML = "";
    console.log(cart);
    let totalAmount = 0;
  
    cart.forEach((cartItem) => {
        
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
            <h6><i class="fas fa-minus"></i> ${quantity} <i class="fas fa-plus"></i></h6>
            </div>
            <div class="quantity">
            <h5>Total Amount</h5>
            <h6>${itemTotal}</h6>
            </div>
            <div class="close-cart">
                <a href="#"><i class="fas fa-close"></i></a>
            </div>
        </div>
      `;
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