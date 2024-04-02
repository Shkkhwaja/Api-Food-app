let finals = [];
let cart = [];

const loadingArray = [...document.getElementsByClassName("loading")];

const fetchData = async () => {
  try {
    loadingArray.forEach(allD => {
      allD.style.display = "block";
    });

    const url = await fetch("catalogue.json");
    const result = await url.json();
    finals.push(...result.dishes);

    console.log(finals);
  } catch (error) {
    console.log("ERROR", error);
  } finally {
    loadingArray.forEach(allD => {
      allD.style.display = "none";
    });
  }
};

const renderItems = () => {
  document.getElementById("sec").innerHTML = finals
    .map(
      (item, index) => `
        <div class="box">
            <div class="custom-box">
                <div class="image-container">
                    <img src="${item.image_link ? item.image_link : "error.jpg"}" class="image">
                    <img src="" class="image-logo">
                </div>
            </div>
            <button class="add-to-cart-button" data-index="${index}">ADD TO CART</button>
            <div class="food-name">
                <h2>${item.name}</h2>
            </div>
            <h3>PRICE : <span> ₹${item.price_in_rupees.toFixed(2)}</span></h3>
            <div class="para">
                <p>${item.description}</p>
            </div>
        </div>
    `
    )
    .join("");

  atToCart();
};

const atToCart = () => {
  const btn = document.querySelectorAll(".add-to-cart-button");

  btn.forEach(button => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      const addItem = finals[index];

      cart.push(addItem);

      renderCart();
    });
  });
};

const mainContainer = document.querySelector(".main-item-container");
// Hide the main container by default
mainContainer.style.display = "none";

const renderCart = () => {
  const displayItem = document.querySelector(".item-container");
  const showTotal = document.querySelector(".total-box h3");

  if (cart.length > 0) {
    mainContainer.style.display = "block";

    displayItem.innerHTML = cart
      .map(
        (item, index) => `
          <div class="item-box" data-index="${index}">
              <div class="img-con">
                  <img src="${item.image_link}" alt="404">
              </div>
              <h2>${item.name.slice(0, 7)}...</h2>
              <div class="count">
                  <span>-</span><span>1</span><span>+</span>
                  <h3>${item.price_in_rupees}.00</h3>
                  <p class="close">❌</p>
              </div>
          </div>`
      )
      .join("");

    const totalAmt = cart.reduce((acc, curval) => acc + curval.price_in_rupees, 0);
    showTotal.innerHTML = `${totalAmt}.00`;

    const closeButtons = document.querySelectorAll('.count .close');
    closeButtons.forEach(closeButton => {
      closeButton.addEventListener('click', () => {
        const index = closeButton.parentElement.parentElement.getAttribute('data-index');
        cart.splice(index, 1);
        renderCart();
      });
    });
  } else {
    mainContainer.style.display = "none"; // Hide the main container if cart is empty
  }
};



const search = () => {
  const input = document.getElementById("searchBar");

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const searchTerm = input.value.trim().toUpperCase();

      const filteredItems = finals.filter(item => item.name.toUpperCase().includes(searchTerm));

      renderSearchResults(filteredItems);
    }
  });
};

const renderSearchResults = (items) => {
  document.getElementById("sec").innerHTML = items
    .map(
      (item) => `
        <div class="box">
            <div class="custom-box">
                <div class="image-container">
                    <img src="${item.image_link ? item.image_link : "error.jpg"}" class="image">
                    <img src="" class="image-logo">
                </div>
            </div>
            <button class="add-to-cart-button">ADD TO CART</button>
            <div class="food-name">
                <h2>${item.name}</h2>
            </div>
            <h3>PRICE : <span> ₹${item.price_in_rupees.toFixed(2)}</span></h3>
            <div class="para">
                <p>${item.description}</p>
            </div>
        </div>
    `
    )
    .join("");

  atToCart();
};

const all = () => {
  const button = document.getElementById("allbtn");

  button.addEventListener("click", () => {
    renderItems();
  });
};

const init = async () => {
  await fetchData();
  renderItems();
  search();
  all();
};

init();
