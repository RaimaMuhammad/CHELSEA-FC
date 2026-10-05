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
  ABOUT PAGE - TEAM MEMBERS
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
   CHELSEA CLUB FACTS SLIDER
========================================================= */

const factCards =
    document.querySelectorAll(
        ".fact-card"
    );


const previousFact =
    document.getElementById(
        "previousFact"
    );


const nextFact =
    document.getElementById(
        "nextFact"
    );


const factCounter =
    document.getElementById(
        "factCounter"
    );


if (
    factCards.length > 0 &&
    previousFact &&
    nextFact &&
    factCounter
) {

    let currentFact = 0;


    /* =========================
       SHOW FACT
    ========================= */

    function showFact(index) {

        factCards.forEach(
            function (card) {

                card.classList.remove(
                    "active-fact"
                );

            }
        );


        factCards[index].classList.add(
            "active-fact"
        );


        factCounter.textContent =
            `${index + 1} / ${factCards.length}`;

    }


    /* =========================
       NEXT FACT
    ========================= */

    nextFact.addEventListener(
        "click",
        function () {

            currentFact++;


            if (
                currentFact >=
                factCards.length
            ) {

                currentFact = 0;

            }


            showFact(currentFact);

        }
    );


    /* =========================
       PREVIOUS FACT
    ========================= */

    previousFact.addEventListener(
        "click",
        function () {

            currentFact--;


            if (currentFact < 0) {

                currentFact =
                    factCards.length - 1;

            }


            showFact(currentFact);

        }
    );


    /* =========================
       INITIAL FACT
    ========================= */

    showFact(currentFact);

}