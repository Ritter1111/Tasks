console.log(
  "Все пункты выполнены (110/110) \nРеализация burger menu на обеих страницах: +26 \n Реализация слайдера-карусели на странице Main: +36  \n Реализация пагинации на странице Pets: +36 \n Реализация попап на обеих страницах: +12"
);
const cards = document.querySelectorAll(".cards");
const card = document.querySelectorAll(".card");
const popup = document.querySelector(".popap-our-friends");
const content = document.querySelector(".content-popap");
const closePopap = document.querySelector(".close-popap");
const burger = document.querySelector(".burger");
const header = document.querySelector(".header");
const linkItem = document.querySelectorAll(".header-item");
const popap = document.querySelector("#popap-our-friends");
const navMenu = document.querySelector(".nav-menu");
const popapName = popap.querySelector(".popap-name-pets");
const popapImg = popap.querySelector(".image-pets-popap");
const popapBreed = popap.querySelector(".breed-dog");
const popapDescription = popap.querySelector(".desc-dog-popap");
const popapAge = popap.querySelector(".link-characteristics:nth-child(1)");
const popapInoculations = popap.querySelector(
  ".link-characteristics:nth-child(2)"
);
const popapDiseases = popap.querySelector(".link-characteristics:nth-child(3)");
const popapParasites = popap.querySelector(
  ".link-characteristics:nth-child(4)"
);
let Data = {};

/*Popup*/
function showPopap(petName) {
  const petData = Data.find((pet) => pet.name === petName);

  popapName.textContent = petData.name;
  popapImg.src = petData.img;
  popapBreed.textContent = `${petData.type} - ${petData.breed}`;
  popapDescription.textContent = petData.description;
  popapAge.innerHTML = "<strong>Age: </strong>" + ` ${petData.age}`;
  popapInoculations.innerHTML =
    "<strong>Inoculations: </strong>" + `${petData.inoculations.join(", ")}`;
  popapDiseases.innerHTML =
    "<strong>Diseases: </strong>" + `${petData.diseases.join(", ")}`;
  popapParasites.innerHTML =
    "<strong>Parasites: </strong>" + `${petData.parasites.join(", ")}`;
}

fetch("../pets.json")
  .then((response) => response.json())
  .then((data) => {
    Data = data;
  })
  .catch((error) => {
    console.log(error);
  });

card.forEach((div) => {
  div.addEventListener("click", (e) => {
    const name = e.currentTarget.dataset.name;
    console.log(name);
    console.log("svgshsh");
    showPopap(div.dataset.name);
    e.preventDefault();
    popup.classList.add("active");
    document.documentElement.style.overflow = "hidden";
  });
});

closePopap.addEventListener("click", () => {
  popup.classList.remove("active");
  document.documentElement.style.overflow = "auto";
});

popup.addEventListener("click", () => {
  popup.classList.remove("active");
  document.documentElement.style.overflow = "auto";
});

content.addEventListener("click", (event) => {
  event.stopPropagation();
});

/*Burger*/

burger.addEventListener("click", () => {
  header.classList.toggle("open");
  if (header.classList.contains("open")) {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
  }
});

document.addEventListener("click", (event) => {
  if (
    header.classList.contains("open") &&
    !event.target.closest(".burger") &&
    !event.target.closest(".nav-menu")
  ) {
    header.classList.remove("open");
    document.documentElement.style.overflow = "";
  }
});

linkItem.forEach((el) => {
  el.addEventListener("click", () => {
    header.classList.remove("open");
    if (header.classList.contains("open")) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  });
});

