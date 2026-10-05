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


/* =========================================================
   CHELSEA FC WEBSITE — GALLERY JAVASCRIPT
========================================================= */


/* =========================================================
   MAIN GALLERY SLIDER
   Images 2–11
========================================================= */

const gallerySlider = document.querySelector(".gallery-slider");

if (gallerySlider) {

    const track = gallerySlider.querySelector(".gallery-slider-track");
    const slides = gallerySlider.querySelectorAll(".gallery-slide");

    const previousButton = gallerySlider.querySelector(".gallery-prev");
    const nextButton = gallerySlider.querySelector(".gallery-next");

    const counter = gallerySlider.querySelector(".gallery-counter");
    const progress = gallerySlider.querySelector(".gallery-progress span");

    let currentSlide = 0;

    function updateGallerySlider() {

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        if (counter) {
            counter.textContent =
                `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
        }

        if (progress) {
            const percentage =
                ((currentSlide + 1) / slides.length) * 100;

            progress.style.width = `${percentage}%`;
        }
    }


    if (nextButton) {

        nextButton.addEventListener("click", function () {

            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            updateGallerySlider();

        });

    }


    if (previousButton) {

        previousButton.addEventListener("click", function () {

            currentSlide--;

            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

            updateGallerySlider();

        });

    }


    updateGallerySlider();
}


/* =========================================================
   STAMFORD BRIDGE SLIDER
   Images 41–45
========================================================= */

const bridgeSlider = document.querySelector(".bridge-slider");

if (bridgeSlider) {

    const bridgeTrack = bridgeSlider.querySelector(".bridge-track");
    const bridgeSlides = bridgeSlider.querySelectorAll(".bridge-slide");

    const previousButton = bridgeSlider.querySelector(".bridge-prev");
    const nextButton = bridgeSlider.querySelector(".bridge-next");

    const counter = document.querySelector(".bridge-counter");

    let currentBridgeSlide = 0;


    function updateBridgeSlider() {

        bridgeTrack.style.transform =
            `translateX(-${currentBridgeSlide * 100}%)`;

        if (counter) {

            counter.textContent =
                `${String(currentBridgeSlide + 1).padStart(2, "0")} / ${String(bridgeSlides.length).padStart(2, "0")}`;

        }

    }


    if (nextButton) {

        nextButton.addEventListener("click", function () {

            currentBridgeSlide++;

            if (currentBridgeSlide >= bridgeSlides.length) {
                currentBridgeSlide = 0;
            }

            updateBridgeSlider();

        });

    }


    if (previousButton) {

        previousButton.addEventListener("click", function () {

            currentBridgeSlide--;

            if (currentBridgeSlide < 0) {
                currentBridgeSlide = bridgeSlides.length - 1;
            }

            updateBridgeSlider();

        });

    }


    updateBridgeSlider();
}


/* =========================================================
   FANS CAROUSEL
   Images 56–63
========================================================= */

const fansCarousel = document.querySelector(".fans-carousel");

if (fansCarousel) {

    const fansTrack = fansCarousel.querySelector(".fans-track");
    const fansCards = fansCarousel.querySelectorAll(".fans-card");

    const fansSection = document.querySelector(".fans-section");

    const previousButton =
        fansSection.querySelector(".fans-prev");

    const nextButton =
        fansSection.querySelector(".fans-next");


    let currentFansSlide = 0;


    function getFansVisibleCards() {

        if (window.innerWidth <= 550) {
            return 1;
        }

        if (window.innerWidth <= 800) {
            return 2;
        }

        if (window.innerWidth <= 1100) {
            return 3;
        }

        return 4;
    }


    function updateFansCarousel() {

        const visibleCards = getFansVisibleCards();

        const maximumSlide =
            Math.max(0, fansCards.length - visibleCards);

        if (currentFansSlide > maximumSlide) {
            currentFansSlide = maximumSlide;
        }

        const cardWidth =
            100 / visibleCards;

        const gap =
            1.2;

        const movement =
            currentFansSlide * (cardWidth + gap / 4);

        fansTrack.style.transform =
            `translateX(-${movement}%)`;

    }


    if (nextButton) {

        nextButton.addEventListener("click", function () {

            const visibleCards = getFansVisibleCards();

            const maximumSlide =
                Math.max(0, fansCards.length - visibleCards);

            currentFansSlide++;

            if (currentFansSlide > maximumSlide) {
                currentFansSlide = 0;
            }

            updateFansCarousel();

        });

    }


    if (previousButton) {

        previousButton.addEventListener("click", function () {

            const visibleCards = getFansVisibleCards();

            const maximumSlide =
                Math.max(0, fansCards.length - visibleCards);

            currentFansSlide--;

            if (currentFansSlide < 0) {
                currentFansSlide = maximumSlide;
            }

            updateFansCarousel();

        });

    }


    window.addEventListener("resize", function () {

        updateFansCarousel();

    });


    updateFansCarousel();
}


/* =========================================================
   PLAYER GALLERY
   Images 21–26
========================================================= */

const playerGallery =
    document.querySelector(".players-gallery-slider");

if (playerGallery) {

    const mainImage =
        playerGallery.querySelector(".player-gallery-main img");

    const thumbnails =
        playerGallery.querySelectorAll(".player-thumb");

    const playerNumber =
        playerGallery.querySelector("#featuredPlayerNumber");

    const playerTitle =
        playerGallery.querySelector("#featuredPlayerTitle");


    thumbnails.forEach(function (thumbnail) {

        thumbnail.addEventListener("click", function () {

            const image =
                thumbnail.dataset.image;

            const number =
                thumbnail.dataset.number;

            const title =
                thumbnail.dataset.title;


            if (mainImage) {

                mainImage.style.opacity = "0";


                setTimeout(function () {

                    mainImage.src = image;

                    mainImage.style.opacity = "1";

                }, 200);

            }


            if (playerNumber) {
                playerNumber.textContent = number;
            }


            if (playerTitle) {
                playerTitle.textContent = title;
            }


            thumbnails.forEach(function (item) {

                item.classList.remove("active");

            });


            thumbnail.classList.add("active");

        });

    });

}


/* =========================================================
   TRAINING MINI SLIDER
   Images 72–75
========================================================= */

const trainingSlider =
    document.querySelector(".training-mini-slider");

if (trainingSlider) {

    const trainingTrack =
        trainingSlider.querySelector(".training-mini-track");

    const trainingImages =
        trainingSlider.querySelectorAll(".training-mini-track img");

    let trainingPosition = 0;


    function moveTrainingSlider() {

        trainingPosition++;

        if (trainingPosition >= trainingImages.length) {
            trainingPosition = 0;
        }

        const imageWidth =
            trainingImages[0].offsetWidth + 11;

        trainingTrack.style.transform =
            `translateX(-${trainingPosition * imageWidth}px)`;

    }


    setInterval(moveTrainingSlider, 3500);

}


/* =========================================================
   TIMELINE HOVER / ACTIVE STATE
========================================================= */

const timelineItems =
    document.querySelectorAll(".timeline-item");

timelineItems.forEach(function (item) {

    item.addEventListener("mouseenter", function () {

        timelineItems.forEach(function (timelineItem) {

            timelineItem.classList.remove("active");

        });

        item.classList.add("active");

    });

});


/* =========================================================
   GALLERY MOSAIC IMAGE INTERACTION
========================================================= */

const mosaicItems =
    document.querySelectorAll(".mosaic-item");

mosaicItems.forEach(function (item) {

    item.addEventListener("click", function () {

        mosaicItems.forEach(function (mosaicItem) {

            mosaicItem.classList.remove("selected");

        });

        item.classList.add("selected");

    });

});


/* =========================================================
   SMOOTH SCROLL FOR GALLERY BUTTONS
========================================================= */

const galleryLinks =
    document.querySelectorAll('.gallery-page a[href^="#"]');

galleryLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================================
   GALLERY PAGE LOADED
========================================================= */

console.log("Chelsea Gallery JavaScript loaded successfully.");
