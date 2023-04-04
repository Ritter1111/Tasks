console.log(
  "Все пункты выполнены (100/100) \nВёрстка страницы Main соответствует макету при ширине экрана 1280px: +14 \n Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14  \nВёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6 \n 6Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6 \nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\n Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\n При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\n Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ : +8"
);

const card = document.querySelectorAll(".card");
const popup = document.querySelector(".popap-our-friends");
const content = document.querySelector(".content-popap");
const closePopap = document.querySelector(".close-popap");
const burger = document.querySelector(".burger");
const header = document.querySelector(".header");
const linkItem = document.querySelectorAll(".header-item");

/*Popup*/

card.forEach((div) => {
  div.addEventListener("click", (e) => {
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
  if (!event.target.closest(".burger") && !event.target.closest(".header")) {
    header.classList.remove("open");
    document.documentElement.style.overflow = "auto";
  }
});

/* Close window when you click on link*/
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
