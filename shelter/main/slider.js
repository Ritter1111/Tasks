const btnRight = document.querySelector("#btn-right");
const btnLeft = document.querySelector("#btn-left");
const slider = document.querySelector(".slider");
const active = document.querySelector("#active");
const left = document.querySelector("#left");
const right = document.querySelector("#right");
let animalData = [];
/* Carousel*/
window.onload = function () {};

fetch("../pets.json")
  .then((response) => response.json())
  .then((data) => {
    animalData = data;
    initSlider();
  })
  .catch((error) => {
    console.log(error);
  });

let prevSlide = [];
let currentSlide = ["Jennifer", "Scarlet", "Woody"];
let nextSlide = [];

function initSlider(direction) {
   
   if (direction === "right") {
    prevSlide = currentSlide;
    if (nextSlide.length) {
      currentSlide = nextSlide;
      nextSlide = ["Timmy", "Freddie", "Woody"]; //,"Charly"
    } else {
      currentSlide = ["Timmy", "Freddie", "Woody"];
      nextSlide = ["Timmy", "Freddie", "Charly"];
    }
  }

  if (direction === "left") {
    prevSlide = currentSlide;
    if (prevSlide.length) {
      currentSlide = prevSlide;
      prevSlide = ["Timmy", "Freddie", "Woody"]; //,"Charly"
    } else {
      currentSlide = ["Timmy", "Freddie", "Woody"];
      prevSlide = ["Timmy", "Freddie", "Charly"];
    }
  }
  const animalJennifer = animalData.find((pet) => pet.name === currentSlide[0]);
  const animalScarlet = animalData.find((pet) => pet.name === currentSlide[1]);
  const animalWoody = animalData.find((pet) => pet.name === currentSlide[2]);
  const generatedCard = generateCard(animalJennifer.name, animalJennifer.img);
  const generatedCard2 = generateCard(animalScarlet.name, animalScarlet.img);
  const generatedCard3 = generateCard(animalWoody.name, animalWoody.img);
  active.append(generatedCard, generatedCard2, generatedCard3);
//   left.append(generatedCard, generatedCard2, generatedCard3);
//   right.append(generatedCard, generatedCard2, generatedCard3);
}

function generateCard(name, imgUrl) {
  const card = document.createElement("div");
  card.className = "card";
  const img1 = document.createElement("img");
  img1.src = imgUrl;
  card.appendChild(img1);
  const paragraph = document.createElement("p");
  paragraph.innerText = name;
  paragraph.className = "name-pet";
  card.appendChild(paragraph);
  const div = document.createElement("div");
  div.className = "pet-button";
  card.appendChild(div);
  const btnText = document.createElement("button");
  btnText.className = "our-friends-button btn";
  btnText.innerText = "Learn more";
  div.appendChild(btnText);

  return card;
}

const onlyLeft = () => {
  slider.classList.add("transition-left");
  initSlider("left");
//   btnLeft.removeEventListener("click", onlyLeft);
//   btnRight.removeEventListener("click", onlyRight);
};

const onlyRight = () => {
  slider.classList.add("transition-right");
  initSlider("right");
  //   btnLeft.removeEventListener("click", onlyLeft);
  //   btnRight.removeEventListener("click", onlyRight);
};

btnLeft.addEventListener("click", onlyLeft);
btnRight.addEventListener("click", onlyRight);

// slider.addEventListener("animationend", (animationEvent) => {
//   if (animationEvent.animationName === "move-left") {
//     slider.classList.remove("transition-left");
//     const items = document.querySelector("#left").innerHTML;

//     document.querySelector("#active").innerHTML = items;

//     //   const crd = document.createElement("div");
//     //   crd.classList.add('cards');
//     //   crd.innerHTML = Math.floor(Math.random() * 8);

//     //   const crd2 = document.createElement("div");
//     //   crd.classList.add('cards');
//     //   crd.innerHTML = Math.floor(Math.random() * 8);

//     //   const crd3 = document.createElement("div");
//     //   crd.classList.add('cards');
//     //   crd.innerHTML = Math.floor(Math.random() * 8);

//     document.querySelector("#left").innerHTML = "";
//     document.querySelector("#left").appendChild(crd);
//     document.querySelector("#left").appendChild(crd2);
//     document.querySelector("#left").appendChild(crd3);
//   } else {
//     slider.classList.remove("transition-right");
//   }
//   btnLeft.addEventListener("click", onlyLeft);
//   btnRight.addEventListener("click", onlyRight);
// });


