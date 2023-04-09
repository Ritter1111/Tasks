(function () {
  let btnStart = document.querySelector("#btnStart");
  let btnPrev = document.querySelector("#btnPrevious");
  let numberPage = document.querySelector("#numberPage");
  let btnNext = document.querySelector("#btnNext");
  let btnEnd = document.querySelector("#btnEnd");
  let arr = 48;
  let animalData = [];
  let numPage = 1;
  let petsData = [];
  let sliderData = [];
  let widthWind;

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

  widthWind = document.body.clientWidth;
  let page;
  if (widthWind > 1060) {
    page = 6;
  } else if (widthWind <= 1060 && widthWind > 720) {
    page = 8;
  } else if (widthWind <= 720) {
    page = 16;
  }



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
      sliderData.push(...randomAnimals(animalData, 3));
    }

    if (direction === "left" && sliderData.length > 5) {
      sliderData.unshift(...randomAnimals(animalData, 3));
      sliderData.splice(-3, 3);
    }

    if (!direction) {
      sliderData = randomAnimals(animalData, 8, []);
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

  function updatePagination() {
    numberPage.innerHTML = numPage;

    if (numPage === 1) {
      btnStart.classList.add("btn-no-interactive");
      btnPrev.classList.add("btn-no-interactive");
      btnNext.classList.remove("btn-no-interactive");
      btnEnd.classList.remove("btn-no-interactive");
      btnStart.disabled = true;
      btnPrev.disabled = true;
      btnNext.disabled = false;
      btnEnd.disabled = false;
    }

    if (widthWind >= 768) {
      if (numPage === 6) {
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.add("btn-no-interactive");
        btnEnd.classList.add("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = true;
        btnEnd.disabled = true;
      }else if(numPage < 6 && numPage !== 1){
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.remove("btn-no-interactive");
        btnEnd.classList.remove("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
      }
    } else if (widthWind >= 664) {
      if (numPage === 8) {
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.add("btn-no-interactive");
        btnEnd.classList.add("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = true;
        btnEnd.disabled = true;
      }
    } else if (widthWind >= 320) {
      if (numPage === 16) {
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.add("btn-no-interactive");
        btnEnd.classList.add("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = true;
        btnEnd.disabled = true;
      }
    }

    if (numPage === animalData.length) {
      btnNext.classList.add("btn-no-interactive");
      btnEnd.classList.add("btn-no-interactive");
      btnStart.classList.remove("btn-no-interactive");
      btnPrev.classList.remove("btn-no-interactive");
      btnNext.disabled = true;
      btnEnd.disabled = true;
      btnStart.disabled = false;
      btnPrev.disabled = false;
    }
  }

  btnNext.addEventListener("click", () => {
    numPage++;
    updatePagination();
  });

  btnPrev.addEventListener("click", () => {
    numPage--;
    updatePagination();
  });

  btnEnd.addEventListener("click", () => {
    numPage = animalData.length;
    updatePagination();
  });

  btnStart.addEventListener("click", () => {
    numPage = 1;
    updatePagination();
  });


//   btnNext.addEventListener("click", () => {
//     numberPage.innerHTML = numPage++;
//   if (widthWind > 768) {
//     if (numPage > 6) {
//       numberPage.innerHTML = "1";
//       numPage = 1;
//       btnStart.classList.remove("btn-no-interactive");
//       btnStart.disabled = false;
//       btnPrev.classList.remove("btn-no-interactive");
//       btnPrev.disabled = false;
//       btnNext.classList.add("btn-no-interactive");
//       btnEnd.classList.add("btn-no-interactive");
//       btnNext.disabled = true;
//       btnEnd.disabled = true;
//     }
//   }else if(widthWind >= 664) {
//     if (numPage > 8) {
//         numberPage.innerHTML = "1";
//         numPage = 1;
//         btnStart.classList.remove("btn-no-interactive");
//         btnPrev.classList.remove("btn-no-interactive");
//         btnNext.classList.add("btn-no-interactive");
//         btnEnd.classList.add("btn-no-interactive");
//       }
//   }else if(widthWind >= 320){
//     if (numPage > 16) {
//         numberPage.innerHTML = "1";
//         numPage = 1;
//         btnStart.classList.remove("btn-no-interactive");
//         btnPrev.classList.remove("btn-no-interactive");
//         btnNext.classList.add("btn-no-interactive");
//         btnEnd.classList.add("btn-no-interactive");
//       }
//   }
//   });
})();
