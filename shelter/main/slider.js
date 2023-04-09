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

  const count2 = 2;
  const count3 = 1;

  let count = 0;
  function resizeWindow() {
    if(window.innerWidth > 1060) {
      count = 3;
  }else if(window.innerWidth <= 1060 && window.innerWidth > 720){
      count = count2;
  }else if(window.innerWidth <= 720){
      count = count3;
  }
  }
  window.addEventListener('resize', resizeWindow)


  let sliderData = [];

  function randomAnimals(animals, count, exclude) {
    let dataAnimal = animals
      .filter((d) => !exclude.includes(d.name))
      .sort(() => 0.5 - Math.random());

    if (dataAnimal.length < count) {
      return [
        ...dataAnimal,
        ...randomAnimals(animals, count - dataAnimal.length, [
          dataAnimal[dataAnimal.length - 1].name,
          dataAnimal[dataAnimal.length - 2].name,
        ]),
      ].slice(0, count);
    } else {
      return dataAnimal.slice(0, count);
    }
  }

  function initSlider(direction) {
    if (direction === "right" && sliderData.length > 5) {
      sliderData.splice(0, 3);
      const excludedNames = [
        sliderData[3].name,
        sliderData[4].name,
        sliderData[5].name,
      ];
      sliderData.push(...randomAnimals(animalData, 3, excludedNames));
    }

    if (direction === "left" && sliderData.length > 5) {
      const excludedNames = [
        sliderData[0].name,
        sliderData[1].name,
        sliderData[2].name,
      ];

      sliderData.unshift(...randomAnimals(animalData, 3, excludedNames));
      sliderData.splice(-3, 3);
    }

    if (!direction) {
      sliderData = randomAnimals(animalData, 9, []);
    }

    let active2 = document.createElement("div");
    active2.id = "active";
    active2.className = "cards";
    active2.append(
      ...sliderData.map((animal) => generateCard(animal.name, animal.img))
    );

    const active = document.querySelector("#active");
    active.replaceWith(active2);
  }

  function generateCard(name, imgUrl) {
    const card = document.createElement("div");
    card.addEventListener("click", (e) => {
      const name = card.dataset.name;
      console.log(name);
      showPopap(card.dataset.name);
      e.preventDefault();
      popup.classList.add("active");
      document.documentElement.style.overflow = "hidden";
    });
    card.className = "card";
    const img1 = document.createElement("img");
    img1.src = imgUrl;
    img1.width = "270";
    img1.height = "270";
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
    slider.classList.add("transition-left");
    initSlider("left");
    btnLeft.removeEventListener("click", onlyLeft);
    btnRight.removeEventListener("click", onlyRight);
  };

  const onlyRight = () => {
    slider.classList.add("transition-right");
    initSlider("right");
    btnLeft.removeEventListener("click", onlyLeft);
    btnRight.removeEventListener("click", onlyRight);
  };

  btnLeft.addEventListener("click", onlyLeft);
  btnRight.addEventListener("click", onlyRight);

  slider.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "move-left") {
      slider.classList.remove("transition-left");
    } else {
      slider.classList.remove("transition-right");
    }
    btnLeft.addEventListener("click", onlyLeft);
    btnRight.addEventListener("click", onlyRight);
  });
})();
