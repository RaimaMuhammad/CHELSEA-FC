 // FORM VALIDATION FOR LOGIN PAGE

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const feedbackDiv = document.getElementById("loginFeedback");
    const navAuthContainer = document.getElementById("navAuthContainer");

    // Comprehensive Active Authentication Layout Controller

    function handleUserSession(authenticated, emailInput = "") {
        if (authenticated) {
            // Cut user identity parsing from email text string
            const username = emailInput.split('@')[0];
            
            // Rewrite navigation layout shell to display active member account and Sign Out capability
            navAuthContainer.innerHTML = `
                <div class="d-flex align-items-center bg-dark bg-opacity-50 rounded-pill p-1 pe-3 border border-secondary shadow-sm">
                    <div class="bg-chelsea-blue text-white rounded-circle d-flex align-items-center justify-content-center me-2 shadow" style="width: 38px; height: 38px;">
                        <i class="fa-solid fa-user-check text-chelsea-gold"></i>
                    </div>
                    <div class="me-3 small text-white">
                        <span class="d-block text-muted text-uppercase fw-bold" style="font-size: 9px; line-height: 1;">Member</span>
                        <span class="fw-bold text-capitalize">${username}</span>
                    </div>
                    <button id="logoutBtn" class="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold text-uppercase" style="font-size: 11px;">
                        <i class="fa-solid fa-power-off me-1"></i>Out
                    </button>
                </div>
            `;

            // Bind click event listener directly onto newly generated sign out actions
            document.getElementById("logoutBtn").addEventListener("click", function() {
                handleUserSession(false);
            });

               } else {
            // Revert back to the updated top-right button look upon logging out
            navAuthContainer.innerHTML = `
                <button class="btn btn-chelsea-gold px-4 py-2 rounded-pill fw-bold text-uppercase shadow-sm nav-login-btn-glow" data-bs-toggle="modal" data-bs-target="#loginModal">
                    <i class="fa-solid fa-right-to-bracket me-2"></i>Login
                </button>
            `;
        }
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (!loginForm.checkValidity()) {
                loginForm.classList.add("was-validated");
                feedbackDiv.classList.add("d-none");
            } else {
                loginForm.classList.remove("was-validated");
                const targetEmailValue = document.getElementById("loginEmail").value;
                
                // Show smooth feedback animation layout block inside our premium card
                feedbackDiv.className = "mt-3 alert glass-alert-success d-flex align-items-center animate__animated animate__fadeIn";
                feedbackDiv.innerHTML = '<i class="fa-solid fa-circle-check fs-5 me-2 text-success"></i> Access Granted! Welcome to Stamford Bridge.';
                feedbackDiv.classList.remove("d-none");

                // Gracefully dismiss modal framework after processing visual validation
                setTimeout(function() {
                    const loginModalEl = document.getElementById('loginModal');
                    const modalInstance = bootstrap.Modal.getInstance(loginModalEl);
                    if(modalInstance) {
                        modalInstance.hide();
                    }
                    
                    // Clear inputs and advance authentication state matrix
                    loginForm.reset();
                    feedbackDiv.classList.add("d-none");
                    handleUserSession(true, targetEmailValue);
                }, 1500);
            }
        }, false);
    }
});

    /* =========================================================
   HOME PAGE AUTHENTICATION.  TAKES USER TO HOME PAGE IF LOGGED IN, OTHERWISE REDIRECTS TO LOGIN PAGE
========================================================= */


/* =========================================================
   1. CHECK LOGIN STATUS
========================================================= */

const loggedIn =
    sessionStorage.getItem("loggedIn");


if (loggedIn !== "true") {

    window.location.href = "login.html";

}


/* =========================================================
   2. GET USER NAME
========================================================= */

const userName =
    sessionStorage.getItem("userName");


/* =========================================================
   3. DISPLAY WELCOME MESSAGE
========================================================= */

const welcomeMessage =
    document.getElementById("welcomeMessage");


if (welcomeMessage && userName) {

    welcomeMessage.textContent =
        `Welcome back, ${userName}!`;

}


/* =========================================================
   4. LOGOUT
========================================================= */

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        /* REMOVE LOGIN SESSION */

        sessionStorage.removeItem("loggedIn");

        sessionStorage.removeItem("userName");

        sessionStorage.removeItem("welcomeMessage");


        /* GO BACK TO LOGIN */

        window.location.href = "login.html";

    });

}

/* ===== HERO STANDINGS =====
   form: "w" = green dot, "l" = red dot
   crest: path to a team logo image, or leave "" for a grey placeholder circle
   us: true highlights your own team's row */
const standings = {
  mens: [
    { pos: 1,  team: "Man City",  p: 5, w: 5, d: 0, l: 0, pts: 15, form: "w", crest: "" },
    { pos: 2,  team: "Arsenal",   p: 5, w: 4, d: 0, l: 1, pts: 12, form: "l", crest: "" },
    { pos: 3,  team: "Brighton",  p: 5, w: 3, d: 1, l: 1, pts: 10, form: "w", crest: "" },
    { pos: 4,  team: "Brentford", p: 5, w: 2, d: 3, l: 0, pts: 9,  form: "w", crest: "" },
    { pos: 5,  team: "Leeds",     p: 5, w: 2, d: 3, l: 0, pts: 9,  form: "l", crest: "" },
    { pos: 6,  team: "Liverpool", p: 5, w: 2, d: 3, l: 0, pts: 9,  form: "w", crest: "" },
    { pos: 7,  team: "Everton",   p: 5, w: 2, d: 3, l: 0, pts: 9,  form: "w", crest: "" },
    { pos: 8,  team: "Hull City", p: 5, w: 2, d: 2, l: 1, pts: 8,  form: "l", crest: "" },
    { pos: 9,  team: "Newcastle", p: 5, w: 2, d: 2, l: 1, pts: 8,  form: "w", crest: "" },
    { pos: 10, team: "Chelsea",   p: 5, w: 2, d: 1, l: 2, pts: 7,  form: "l", crest: "", us: true }
  ],
  womens: [
    { pos: 1,  team: "Team A",  p: 4, w: 4, d: 0, l: 0, pts: 12, form: "w", crest: "" },
    { pos: 2,  team: "Team B",  p: 4, w: 3, d: 1, l: 0, pts: 10, form: "w", crest: "" },
    { pos: 3,  team: "Chelsea", p: 4, w: 3, d: 0, l: 1, pts: 9,  form: "w", crest: "", us: true },
    { pos: 4,  team: "Team C",  p: 4, w: 2, d: 1, l: 1, pts: 7,  form: "l", crest: "" },
    { pos: 5,  team: "Team D",  p: 4, w: 2, d: 0, l: 2, pts: 6,  form: "w", crest: "" },
    { pos: 6,  team: "Team E",  p: 4, w: 1, d: 2, l: 1, pts: 5,  form: "l", crest: "" },
    { pos: 7,  team: "Team F",  p: 4, w: 1, d: 1, l: 2, pts: 4,  form: "l", crest: "" },
    { pos: 8,  team: "Team G",  p: 4, w: 1, d: 0, l: 3, pts: 3,  form: "l", crest: "" },
    { pos: 9,  team: "Team H",  p: 4, w: 0, d: 2, l: 2, pts: 2,  form: "l", crest: "" },
    { pos: 10, team: "Team I",  p: 4, w: 0, d: 1, l: 3, pts: 1,  form: "l", crest: "" }
  ]
};

/* ===== TOGGLE LOGIC (no need to edit) ===== */
const body  = document.getElementById("standingsBody");
const table = document.querySelector(".standings-table");
const tabs  = document.querySelectorAll(".standings-tabs .tab");

function render(key) {
  body.innerHTML = standings[key].map(r => `
    <tr class="${r.us ? "is-us" : ""}">
      <td>${r.pos}</td>
      <td class="team">
        <span class="dot ${r.form}"></span>
        ${r.crest ? `<img class="crest" src="${r.crest}" alt="">` : `<span class="crest"></span>`}
        ${r.team}
      </td>
      <td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
      <td class="pts">${r.pts}</td>
    </tr>`).join("");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    if (tab.classList.contains("is-active")) return;

    tabs.forEach(t => {
      const on = t === tab;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on);
    });

    table.classList.add("is-switching");            // fade out
    setTimeout(() => {
      render(tab.dataset.team);                      // swap the rows
      table.classList.remove("is-switching");        // fade back in
    }, 250);
  });
});

render("mens"); // default view