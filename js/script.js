const musicGrid = document.querySelector(".music-grid");

const nextButton = document.querySelector(
    ".music-nav-buttons button:last-child"
);

const previousButton = document.querySelector(
    ".music-nav-buttons button:first-child"
);

const progress = document.querySelector(".music-progress-active");


// MUSIC SLIDER

function getScrollAmount() {
    const visibleCards = [...document.querySelectorAll(".music-card")]
        .filter(card => card.style.display !== "none");

    const card = visibleCards[0];

    if (!card) return 0;

    const styles = getComputedStyle(musicGrid);
    const gap = parseFloat(styles.columnGap) || 0;

    return card.offsetWidth + gap;
}


nextButton.addEventListener("click", function () {
    musicGrid.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
    });
});


previousButton.addEventListener("click", function () {
    musicGrid.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
    });
});


musicGrid.addEventListener("scroll", function () {

    const maxScroll =
        musicGrid.scrollWidth - musicGrid.clientWidth;

    const percentage =
        maxScroll > 0
            ? (musicGrid.scrollLeft / maxScroll) * 90 + 10
            : 10;

    progress.style.width = percentage + "%";
});


// MOBILE MENU

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("open");
    });
}


// MUSIC FILTERS

const filterButtons =
    document.querySelectorAll(".music-filters button");

const musicCards =
    document.querySelectorAll(".music-card");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const filter = button.dataset.filter;

        // active menu
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // filter cards
        musicCards.forEach(function (card) {

            const categories =
                (card.dataset.category || "").split(" ");

            if (
                filter === "all" ||
                categories.includes(filter)
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });


        // slider vissza az elejére
        musicGrid.scrollTo({
            left: 0,
            behavior: "smooth"
        });

        progress.style.width = "10%";

    });

});