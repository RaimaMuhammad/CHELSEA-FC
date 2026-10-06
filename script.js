"use strict";


/* =========================================================
   LOGIN FORM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                document.getElementById("email");

            const password =
                document.getElementById("password");

            const loginMessage =
                document.getElementById("loginMessage");

            if (!email || !password || !loginMessage) {
                return;
            }

            const emailValue =
                email.value.trim();

            const passwordValue =
                password.value.trim();


            /* =========================
               BASIC VALIDATION
            ========================= */

            if (emailValue === "" || passwordValue === "") {

                loginMessage.textContent =
                    "Please enter your email and password.";

                loginMessage.className =
                    "login-message error";

                return;
            }


            /* =========================
               SIMPLE LOGIN CHECK
            ========================= */

            sessionStorage.setItem(
                "loggedIn",
                "true"
            );

            sessionStorage.setItem(
                "userName",
                emailValue
            );


            loginMessage.textContent =
                "Login successful. Redirecting...";

            loginMessage.className =
                "login-message success";


            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 700);

        });

    }

});


/* =========================================================
   NAVIGATION AUTHENTICATION
   SHOW LOGIN / LOGOUT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navAuthContainer =
        document.getElementById("navAuthContainer");

    if (!navAuthContainer) {
        return;
    }


    const loggedIn =
        sessionStorage.getItem("loggedIn");

    const userName =
        sessionStorage.getItem("userName");


    if (loggedIn === "true") {

        navAuthContainer.innerHTML = `
            <button
                type="button"
                id="logoutBtn"
                class="logout-btn">
                Logout
            </button>
        `;


        const logoutBtn =
            document.getElementById("logoutBtn");


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                function () {

                    sessionStorage.removeItem(
                        "loggedIn"
                    );

                    sessionStorage.removeItem(
                        "userName"
                    );

                    sessionStorage.removeItem(
                        "welcomeMessage"
                    );

                    window.location.href =
                        "login.html";

                }
            );

        }

    }

});


/* =========================================================
   HOME PAGE AUTHENTICATION
   ONLY RUNS ON index.html
========================================================= */

const currentPage =
    window.location.pathname
        .split("/")
        .pop();


if (
    currentPage === "" ||
    currentPage === "index.html"
) {

    const loggedIn =
        sessionStorage.getItem("loggedIn");


    /*
       ONLY THE HOME PAGE REQUIRES LOGIN.
       ABOUT, TEAM, MARKET AND GALLERY
       WILL NOT BE REDIRECTED.
    */

    if (loggedIn !== "true") {

        window.location.href =
            "login.html";

    }


    /* =========================
       WELCOME MESSAGE
    ========================= */

    const userName =
        sessionStorage.getItem("userName");


    const welcomeMessage =
        document.getElementById("welcomeMessage");


    if (
        welcomeMessage &&
        userName
    ) {

        welcomeMessage.textContent =
            `Welcome back, ${userName}!`;

    }


    /* =========================
       LOGOUT
    ========================= */

    const logoutBtn =
        document.getElementById("logoutBtn");


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                sessionStorage.removeItem(
                    "loggedIn"
                );

                sessionStorage.removeItem(
                    "userName"
                );

                sessionStorage.removeItem(
                    "welcomeMessage"
                );

                window.location.href =
                    "login.html";

            }
        );

    }

}


/* =========================================================
   HERO STANDINGS
========================================================= */

(function () {

    const standingsContainer =
        document.getElementById(
            "standingsContainer"
        );


    if (!standingsContainer) {
        return;
    }


    const standings = [

        {
            position: 1,
            team: "Chelsea",
            played: 10,
            won: 8,
            drawn: 1,
            lost: 1,
            points: 25
        },

        {
            position: 2,
            team: "Arsenal",
            played: 10,
            won: 7,
            drawn: 2,
            lost: 1,
            points: 23
        },

        {
            position: 3,
            team: "Manchester City",
            played: 10,
            won: 7,
            drawn: 1,
            lost: 2,
            points: 22
        },

        {
            position: 4,
            team: "Brighton",
            played: 10,
            won: 6,
            drawn: 2,
            lost: 2,
            points: 20
        }

    ];


    standings.forEach(function (team) {

        const row =
            document.createElement("div");

        row.className =
            "standings-row";


        row.innerHTML = `

            <span class="position">
                ${team.position}
            </span>

            <span class="team-name">
                ${team.team}
            </span>

            <span>
                ${team.played}
            </span>

            <span>
                ${team.won}
            </span>

            <span>
                ${team.drawn}
            </span>

            <span>
                ${team.lost}
            </span>

            <span class="points">
                ${team.points}
            </span>

        `;


        standingsContainer.appendChild(row);

    });

})();




























































































































/* =========================================================
  ABOUT PAGE 
========================================================= */


/* =========================================================
   MOMENTS IN TIME SLIDER
========================================================= */

const momentCards =
    document.querySelectorAll(
        ".moment-card"
    );


const previousMoment =
    document.getElementById(
        "previousMoment"
    );


const nextMoment =
    document.getElementById(
        "nextMoment"
    );


const momentCounter =
    document.getElementById(
        "momentCounter"
    );


if (
    momentCards.length > 0 &&
    previousMoment &&
    nextMoment &&
    momentCounter
) {

    let currentMoment = 0;


    /* =========================
       SHOW MOMENT
    ========================= */

    function showMoment(index) {

        momentCards.forEach(
            function (card) {

                card.classList.remove(
                    "active-moment"
                );

            }
        );


        momentCards[index].classList.add(
            "active-moment"
        );


        momentCounter.textContent =
            `${index + 1} / ${momentCards.length}`;

    }


    /* =========================
       NEXT MOMENT
    ========================= */

    nextMoment.addEventListener(
        "click",
        function () {

            currentMoment++;


            if (
                currentMoment >=
                momentCards.length
            ) {

                currentMoment = 0;

            }


            showMoment(currentMoment);

        }
    );


    /* =========================
       PREVIOUS MOMENT
    ========================= */

    previousMoment.addEventListener(
        "click",
        function () {

            currentMoment--;


            if (currentMoment < 0) {

                currentMoment =
                    momentCards.length - 1;

            }


            showMoment(currentMoment);

        }
    );


    /* =========================
       INITIAL MOMENT
    ========================= */

    showMoment(currentMoment);

}

































































































































































/* =========================================================
  GALLERY PAGE
========================================================= */            

"use strict";

/* =========================================
   GALLERY FILTER
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const searchInput = document.querySelector("#photoSearch");
const photoCount = document.querySelector("#photoCount");
const noResults = document.querySelector("#noResults");
let activeCategory = "all";

// Show a photo when it matches both the selected category and search text.
function updateGallery() {
  const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";
  let visiblePhotos = 0;

  galleryItems.forEach((item) => {
    const category = item.dataset.category;
    const matchesCategory = activeCategory === "all" || category === activeCategory;
    const matchesSearch = item.textContent.toLowerCase().includes(searchText);
    const shouldShow = matchesCategory && matchesSearch;

    item.hidden = !shouldShow;
    if (shouldShow) visiblePhotos += 1;
  });

  if (photoCount) {
    photoCount.textContent = `${visiblePhotos} ${visiblePhotos === 1 ? "photo" : "photos"}`;
  }

  if (noResults) {
    noResults.hidden = visiblePhotos > 0;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    updateGallery();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", updateGallery);
}

updateGallery();

/* =========================================
   IMAGE MODAL
========================================= */

const galleryImages = document.querySelectorAll(".gallery-open");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");

const imageModalElement = document.getElementById("imageModal");

let imageModal;

if (imageModalElement) {
  imageModal = new bootstrap.Modal(imageModalElement);
}

galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    const imageSource = image.getAttribute("data-image");

    const title = image.getAttribute("data-title");

    modalImage.src = imageSource;
    modalImage.alt = title;

    modalTitle.textContent = title;

    imageModal.show();
  });
});

"}"