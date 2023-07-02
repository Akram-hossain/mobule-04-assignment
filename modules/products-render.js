const renderProducts = (allProducts) => {
    let newProduct = '';
    allProducts.map((product) => {
        newProduct += `
        <div class="col-lg-4">
            <div class="product-box card" id="${product.id}">
            <div class="thumbnail">
                <img src="${product.thumbnail}" alt="Thumbnail"
                class="img-fluid">
            </div>
            <div class="txt card-body">
                <h5>${product.name}</h5>
                <div class="bttns">
                <a href="#" class="add-to-cart" product-id="${product.id}">Add to cart</a>
                <h6>$ ${product.price}</h6>
                </div>
            </div>
            </div>
        </div>
    `
    }); 
    document.querySelector("#products").innerHTML = newProduct;
}

export {renderProducts};