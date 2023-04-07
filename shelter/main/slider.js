(function () {
  const btnRight = document.querySelector("#btn-right");
  const btnLeft = document.querySelector("#btn-left");
  const slider = document.querySelector(".slider");
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

  let sliderData = [];

  function randomAnimals(count, exclude) {
    let rand = Math.floor(Math.random() * animalData.length);
    let dataAnimal = [animalData[rand]];
    dataAnimal.push(...animalData.filter((d) => !exclude.includes(d.name)));
    return dataAnimal;
  }

  function initSlider(direction) {
    if (direction === "right" && sliderData.length > 5) {
      sliderData.splice(0, 3);
      const excludedNames = [
        sliderData[3].name,
        sliderData[4].name,
        sliderData[5].name,
      ];
      sliderData.push(...randomAnimals(3, excludedNames));
    }

    if (direction === "left" && sliderData.length > 5) {
      const excludedNames = [
        sliderData[0].name,
        sliderData[1].name,
        sliderData[2].name,
      ];
      sliderData.unshift(...randomAnimals(3, excludedNames));
      sliderData.splice(-3, 3);
    }

    if (!direction) {
      sliderData = randomAnimals(9, []);
    }

    let active2 = document.createElement("div");
    active2.id = "active";
    active2.className = "cards";
    active2.append(
      ...sliderData.map((animal) => generateCard(animal.name, animal.img))
    );

    const active = document.querySelector("#active");
    active.replaceWith(active2);

    // if (direction === "right") {
    //   slider.style.transform = "translateX(-930px)";
    // }

    // if (direction === "left") {
    //   slider.style.transform = "translateX(0px)";
    // }
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
    card.dataset.name = name;
    div.className = "pet-button";
    card.appendChild(div);
    const btnText = document.createElement("button");
    btnText.className = "our-friends-button btn";
    btnText.innerText = "Learn more";
    div.appendChild(btnText);

    return card;
  }

  const onlyLeft = () => {
    slider.classList.add('transition-left');
    initSlider("left");
  };

  const onlyRight = () => {
    slider.classList.add('transition-right');
    initSlider("right");
  };

  btnLeft.addEventListener("click", onlyLeft);
  btnRight.addEventListener("click", onlyRight);
})();

// slider.addEventListener("animationend", (animationEvent) => {
//   if (animationEvent.animationName === "move-left") {
// slider.classList.remove("transition-left");
// const items = document.querySelector("#left").innerHTML;

// document.querySelector("#active").innerHTML = items;
//   } else {
// slider.classList.remove("transition-right");
//   }
//   btnLeft.addEventListener("click", onlyLeft);
//   btnRight.addEventListener("click", onlyRight);
// });
