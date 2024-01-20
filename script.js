let finals = [];


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

    console.log(finals);
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
  }); 
};




search();
main();
all();
