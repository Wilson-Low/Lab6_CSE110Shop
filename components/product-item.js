// product-item.js

class ProductItem extends HTMLElement {
  // TODO

  constructor(i, imgsrc, title_, price_, inCart_) {
    // Super has to be called first in the constructor
    super();

    let inCart = inCart_;

    // Writing element functionality
    this.attachShadow({ mode: 'open' });

    let wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');

    let img = wrapper.appendChild(document.createElement('img'));
    img.src = imgsrc;
    img.alt = title_;

    let title = wrapper.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    title.textContent = title_;

    let price = wrapper.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = price_;

    let button = wrapper.appendChild(document.createElement('button'));
    if (inCart) {
      cartCount++;
      button.innerHTML = "Remove from Cart";
      document.getElementById("cart-count").textContent = cartCount;
    }
    else {
      button.innerHTML = "Add to Cart";
    }
    button.addEventListener('click', function () {
      if (inCart) {
        button.innerHTML = "Add to Cart";
        cartCount--;
        inCart = false;
        alert("Removed from Cart!");
        products[i].inCart = false;
      }
      else {
        button.innerHTML = "Remove from Cart"
        cartCount++;
        inCart = true;
        alert("Added to Cart!");
        products[i].inCart = true;
      }
      document.getElementById("cart-count").textContent = cartCount;
      myStorage.setItem("products", JSON.stringify(products));
    });

    // Adding in the styles
    const style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }

    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }

    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }

    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }

    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }

    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    `;

    this.shadowRoot.append(style, wrapper);
  }
}

customElements.define('product-item', ProductItem);

/*

  <!-- Sample Product -->
                <!-- li class="product">
                    <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
                    <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
                    <p class="price">$109.95</p>
                    <button onclick="alert('Added to Cart!')">Add to Cart</button>
                </li -->

*/