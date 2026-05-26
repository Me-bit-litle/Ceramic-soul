import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import JustValidate from 'just-validate';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "../sass/style.scss";

const burger = document.querySelector(".burger"),
	close = document.querySelector(".header__menu-close"),
	menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
	menu.classList.add("header__menu_active");
	document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
	menu.classList.remove("header__menu_active");
	document.body.style.overflow = "";
});

const swiper = new Swiper(".works__slider", {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: ".icon-left-open",
    nextEl: ".icon-right-open",
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    1920: {
      spaceBetween: 35,
    }
  },
});

try {
  const tabs = document.querySelectorAll(".catalog__tab");
  const contents = document.querySelectorAll(".catalog__content-item");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {

      tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
      contents.forEach((c) => (c.style.display = "none"));

      tab.classList.add("catalog__tab_active");
      contents[index].style.display = "flex";
    });
  });

contents.forEach((c, i) => (c.style.display = i === 0 ? "flex" : "none"));
} catch (e) {}

try {
const validator = new JustValidate("form");

validator
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Please fill the name',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Min 2 char. Pleeeeease write more whan 2 char',
    }
  ])
  .addField('#email', [
    {
      rule: 'required',
    },
    {
      rule: 'email',
    }
  ])
  .addField('#question', [
    {
      rule: 'required',
    },
    {
      rule: 'minLength',
      value: 5,
    }
  ], 
  {
    errorsContainer: document.querySelector('#question').parentElement.querySelector('.error-message'),
  }
)
  .addField('#checkbox', [
    {
      rule: 'required',
    },
  ],
  {
    errorsContainer: document.querySelector('#checkbox').parentElement.querySelector('.checkbox-error-message'),
  }
)
.onSuccess((event) => {
			const form = event.currentTarget;
			const formData = new FormData(form);

			fetch("https://httpbin.org/post", {
				method: "POST",
				body: formData,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log("Success", data);
					form.reset();
				});
})
} catch (e) {

}

try {
const validFooter = new JustValidate("#footer__form", {submitFormAutomatically: true});

validFooter
   .addField('#footer__email', [
    {
      rule: 'required',
    },
    {
      rule: 'email',
    }
  ])
  .addField('#footer__checkbox', [
    {
      rule: 'required',
    },
  ],
  {
    errorsContainer: document.querySelector('#footer__checkbox').parentElement.querySelector('.checkbox-error-message'),
  }
);
} catch (e) {

}