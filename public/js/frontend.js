  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

/**
 * Init typed.js
 */
const selectTyped = document.querySelector(".typed");
if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
        strings: typed_strings,
        loop: false,
        startDelay: 2000,
        typeSpeed: 30,
        backSpeed: 30,
        backDelay: 2000,
    });
}

/**
 * Animation on scroll function and init
 */
function aosInit() {
    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
    });
}
window.addEventListener("load", aosInit);

/**
 * Animate the skills items on reveal
 */
let skillsAnimation = document.querySelectorAll(".skills-animation");
skillsAnimation.forEach((item) => {
    // console.log(item);
    // let x = item.querySelectorAll(".progress .progress-bar");
    // console.log(x);
    // console.log(x[0].getAttribute("aria-valuenow") + "%");
    new Waypoint({
        element: item,
        offset: "90%",
        handler: function (direction) {
            //  console.log("WAYPOINT FIRED");
            let progress = item.querySelectorAll(".progress .progress-bar");
            progress.forEach((el) => {
                el.style.width = el.getAttribute("aria-valuenow") + "%";
            });
        },
    });
});

/**
 * Initiate glightbox
 */
const glightbox = GLightbox({
    selector: ".glightbox",
});

/**
 * Init isotope layout and filters
 */
document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
        initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
            itemSelector: ".isotope-item",
            layoutMode: layout,
            filter: filter,
            sortBy: sort,
        });
    });

    isotopeItem.querySelectorAll(".isotope-filters li").forEach(function (filters) {
        filters.addEventListener(
            "click",
            function () {
                isotopeItem
                    .querySelector(".isotope-filters .filter-active")
                    .classList.remove("filter-active");
                this.classList.add("filter-active");
                initIsotope.arrange({
                    filter: this.getAttribute("data-filter"),
                });
                if (typeof aosInit === "function") {
                    aosInit();
                }
            },
            false
        );
    });
});

/**
 * Correct scrolling position upon page load for URLs containing hash links.
 */
$(".navmenu__items-list a").on("click", function () {
    $(".navmenu__items-list a.filter-active").removeClass("filter-active");
    $(this).addClass("filter-active");
});

/**
 * Navmenu Scrollspy
 */
let navmenulinks = document.querySelectorAll(".navmenu__items-list a");

function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 300;
        if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
            document
                .querySelectorAll(".navmenu a.filter-active")
                .forEach((link) => link.classList.remove("filter-active"));
            navmenulink.classList.add("filter-active");
        } else {
            navmenulink.classList.remove("filter-active");
        }
    });
}
window.addEventListener("load", navmenuScrollspy);
document.addEventListener("scroll", navmenuScrollspy);

/**
 * Modify navmenu for mobile device
 */
document.addEventListener("DOMContentLoaded", function () {
    // --- Standard Mobile Menu Toggle ---
    const navbarToggle = document.getElementById("navbarToggle");
    const navbarMenu = document.getElementById("navmenu");
    const navBarContainer = document.querySelector(".navbar__container");
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener("click", function () {
            navbarToggle.classList.toggle("is-active");
            navbarMenu.classList.toggle("is-active");
            navBarContainer.classList.toggle("is-active");
        });
    }
});

/**
 * Add scroll class to navmenu when scroll
 */
// The occurrence of the "scroll" event calls the function that adds/removes the "scrolled" class depending on whether the "scrollTop() > 50" condition is met or not.
$(window).on("scroll", () => {
    $(".navbar__container").toggleClass("scrolled", $(window).scrollTop() > 50);
});
