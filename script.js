
let finals = [];
let cart = []

const loadingArray = [...document.getElementsByClassName("loading")];

const main = async () => {
  try {
    loadingArray.forEach(allD => {
      allD.style.display = "block";
    });

    const url = await fetch("catalogue.json");
    const result = await url.json();
    const final = result.dishes;
    finals.push(...final);

    // console.log(finals);
  } catch (error) {
    console.log("ERROR", error);
  } finally {
    loadingArray.forEach(allD => {
      allD.style.display = "none";
    });
  }




  document.getElementById("sec").innerHTML = finals
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
    atToCart()
  };

//  add To Cart Function 

const atToCart = () => {


  
  let btn = document.querySelectorAll(".add-to-cart-button");
  let mainContainer = document.querySelector(".main-item-container")
  let displayItem = document.querySelector(".item-container");
  let totalBox = document.querySelector(".total-box");
  let showTotal = document.querySelector(".total-box h3")

  mainContainer.style.display = "none"
  displayItem.style.display = "none";
  totalBox.style.display = "none";

  btn.forEach((i, index) => {
    i.addEventListener("click", () => {
        mainContainer.style.display = "block"
      displayItem.style.display = "block";
      totalBox.style.display = "block";
      let addItem = {
        id: finals[index].id,
        itemName: finals[index].name,
        img: finals[index].image_link,
        price: finals[index].price_in_rupees,
      };

      cart.push(addItem);

      displayItem.innerHTML = cart
        .map(
          (addd) => `
          <div class="item-container">
          <div class="item-box">
              <div class="img-con">
                  <img src="${addd.img}" alt="404">
              </div>
              <h2>${addd.itemName.slice(0,7)}...</h2>
              <div class="count">
                  <span>-</span><span>1</span><span>+</span>
                  <h3>${addd.price}.00</h3>
                  <p id="close">❌</p>
              </div>
          </div>
          </div>`
        )
        .join("");

      console.log(cart);
      let totalAmt = cart.reduce((acc, curval) => acc + curval.price, 0);
      showTotal.innerHTML = `${totalAmt}.00`;


      $(document).ready(function () {
        $(document).on("click", '.count #close', function () {
          var itemBox = $(this).closest('.item-box');
          var index = $('.item-box').index(itemBox);
          itemBox.fadeOut();
          cart.splice(index,1)
          console.log(cart);
          
          let totalAmtCart = cart.reduce((acc, curval) => acc + curval.price, 0);
          showTotal.innerHTML = `${totalAmtCart}.00`

          
          if(totalAmtCart == 0){
            mainContainer.style.display = "none"

          }
          
      });
    });
      

    });
  });
};







// search Function
const search = () => {
  let input = document.getElementById("searchBar");

  input.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
    let searchTerm = input.value.trim().toUpperCase();
``
    let a = finals.filter((item) => {
      return item.name.toUpperCase().includes(searchTerm);
    });

    document.getElementById("sec").innerHTML = a
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
                <h3>PRICE : <span> ₹${item.price_in_rupees.toFixed(
                  2
                )}</span></h3>
                <div class="para">
                    <p>${item.description}</p>
                </div>
            </div>
        `
      )
      .join("");
      
      
      atToCart()
    }
  });
  
};

let all = () => {
  let button = document.getElementById("allbtn");

  button.addEventListener("click", () => {
    
    document.getElementById("sec").innerHTML = finals
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
                <h3>PRICE : <span> ₹${item.price_in_rupees.toFixed(
                  2
                )}</span></h3>
                <div class="para">
                    <p>${item.description}</p>
                </div>
            </div>
        `
      )
      .join("");
      atToCart()
  }); 
};












atToCart()
search();
main();
all();
