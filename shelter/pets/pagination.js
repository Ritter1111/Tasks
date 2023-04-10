(function () {
  let btnStart = document.querySelector("#btnStart");
  let btnPrev = document.querySelector("#btnPrevious");
  let numberPage = document.querySelector("#numberPage");
  let btnNext = document.querySelector("#btnNext");
  let btnEnd = document.querySelector("#btnEnd");
  const arr = 48;
  let animalData = [];
  let numPage = 1;
  let widthWind;
  let pagesData = [];

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
  let previousWidth = widthPage();
  window.addEventListener("resize", (e) => {
    if (previousWidth === widthPage()) {
      return;
    }
    previousWidth = widthPage();
    const array = [];
    for (let i = 0; i < arr / widthPage(); i++) {
      array.push(randomAnimals(animalData, widthPage(), []));
    }
    pagesData = array;
    initSlider();
  });

  function widthPage() {
    widthWind = document.body.clientWidth;
    let page = 0;
    if (widthWind > 1060) {
      page = 8;
    } else if (widthWind <= 1060 && widthWind > 634) {
      page = 6;
    } else if (widthWind <= 634) {
      page = 3;
    }
    return page;
  }

  function randomAnimals(animals, count, exclude) {
    let dataAnimal = animals.sort(() => 0.5 - Math.random());
    return dataAnimal.slice(0, count);
  }

  function initSlider(direction, page = 1) {
    if (!direction) {
      for (let i = 0; i < arr / widthPage(); i++) {
        pagesData.push(randomAnimals(animalData, widthPage(), []));
      }
    }

    let active2 = document.createElement("div");
    active2.id = "active";
    active2.className = "cards";
    active2.append(
      ...pagesData[page - 1].map((animal) =>
        generateCard(animal.name, animal.img)
      )
    );

    const active = document.querySelector("#active");
    active.replaceWith(active2);

    numPage = page;
    updatePagination();
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
      if (numPage >= 6) {
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.add("btn-no-interactive");
        btnEnd.classList.add("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
        btnNext.setAttribute("disabled", "disabled");
        btnEnd.setAttribute("disabled", "disabled");
      }
      if (numPage < 16 && numPage !== 1) {
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.remove("btn-no-interactive");
        btnEnd.classList.remove("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = false;
        btnEnd.disabled = false;
      }
    } else if (widthWind >= 664) {
      if (numPage >= 8) {
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.add("btn-no-interactive");
        btnEnd.classList.add("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = true;
        btnEnd.disabled = true;
      }
      if (numPage < 8 && numPage !== 1) {
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.remove("btn-no-interactive");
        btnEnd.classList.remove("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = false;
        btnEnd.disabled = false;
      }
    } else if (widthWind < 664) {
      if (numPage >= 16) {
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.add("btn-no-interactive");
        btnEnd.classList.add("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = true;
        btnEnd.disabled = true;
      }
      if (numPage < 16 && numPage !== 1) {
        btnStart.classList.remove("btn-no-interactive");
        btnPrev.classList.remove("btn-no-interactive");
        btnNext.classList.remove("btn-no-interactive");
        btnEnd.classList.remove("btn-no-interactive");
        btnStart.disabled = false;
        btnPrev.disabled = false;
        btnNext.disabled = false;
        btnEnd.disabled = false;
      }
    }

    if (numPage === pagesData.length) {
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
    initSlider("right", numPage);
  });

  btnPrev.addEventListener("click", () => {
    numPage--;
    initSlider("right", numPage);
  });

  btnEnd.addEventListener("click", () => {
    numPage = pagesData.length;
    initSlider("right", numPage);
  });

  btnStart.addEventListener("click", () => {
    numPage = 1;
    initSlider("right", numPage);
  });
})();
