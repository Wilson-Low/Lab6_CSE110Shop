// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO  
  myStorage = window.localStorage;
  let buttons = [];
  cartCount = 0;

  if (!myStorage.getItem("products")) {
    (async function () {
      await fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => myStorage.setItem("products", JSON.stringify(data)));
      products = JSON.parse(myStorage["products"]);
      for (i = 0; i < products.length; ++i) {
        products[i].inCart = false;
        document.getElementById("product-list").append(new ProductItem(i, products[i].image, products[i].title, products[i].price, products[i].inCart));
        myStorage.setItem("products", JSON.stringify(products));
      }
    })();
  }
  else {
    products = JSON.parse(myStorage["products"]);
    for (i = 0; i < products.length; ++i) {
      document.getElementById("product-list").append(new ProductItem(i, products[i].image, products[i].title, products[i].price, products[i].inCart));
    }
  }
});

