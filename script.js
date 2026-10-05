/* =========================================================
   LOG IN / SIGN UP PAGE
   ========================================================= */

/* ==================== 1. ELEMENTS ==================== */
const $ = (id) => document.getElementById(id);
const loginForm = $("loginForm"), registerForm = $("registerForm"), welcomeView = $("welcomeView");
const banner = $("banner"), signOutBtn = $("signOutBtn");

/* ==================== 2. COUNTRY DROPDOWN ==================== */
const countries = ["Uganda","Kenya","Tanzania","Rwanda","Nigeria","Ghana","South Africa","Egypt","Morocco",
  "United Kingdom","Ireland","France","Germany","Spain","Italy","Portugal","Netherlands","Belgium",
  "United States","Canada","Brazil","Argentina","Mexico","India","China","Japan","South Korea",
  "Australia","New Zealand","United Arab Emirates","Saudi Arabia","Other"];
countries.forEach((c) => $("regCountry").add(new Option(c, c)));

/* ==================== 3. STORAGE HELPERS ==================== */
// NOTE: localStorage is for demo/learning only. Real sites need a server + database.
const getUsers = () => JSON.parse(localStorage.getItem("cfc_users") || "{}");
const saveUsers = (u) => localStorage.setItem("cfc_users", JSON.stringify(u));
const getSession = () => localStorage.getItem("cfc_session");

async function hash(text) {
  if (!window.crypto || !crypto.subtle) return btoa(text); // fallback
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* ==================== 4. VIEW SWITCHING ==================== */
function show(view) {
  [loginForm, registerForm, welcomeView].forEach((v) => (v.hidden = v !== view));
  signOutBtn.hidden = !getSession();
}
function message(text, isError = false) {
  banner.textContent = text;
  banner.className = "banner" + (isError ? " error" : "");
  banner.hidden = false;
}
function clearMessage() { banner.hidden = true; }

function showWelcome(user, text) {
  $("welcomeTitle").textContent = text;
  $("welcomeText").textContent = "You are signed in as " + user.email + ". Use Home (top left) to return here at any time.";
  show(welcomeView);
}

/* ==================== 5. VALIDATION ==================== */
function setError(input, msg) {
  input.classList.toggle("invalid", !!msg);
  input.parentElement.querySelector(".err").textContent = msg || "";
  return !msg;
}
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function validateRegister() {
  const name = $("regName"), email = $("regEmail"), phone = $("regPhone"), dob = $("regDob"),
        country = $("regCountry"), pw = $("regPassword"), cf = $("regConfirm");
  const today = new Date().toISOString().split("T")[0];
  const results = [
    setError(name, name.value.trim().length < 2 ? "Enter at least two characters." : ""),
    setError(email, emailOk(email.value.trim()) ? "" : "Enter a valid email address."),
    setError(phone, /^\+?\d{9,15}$/.test(phone.value.trim()) ? "" : "Enter 9–15 digits, no spaces."),
    setError(dob, !dob.value ? "Choose your date of birth." : dob.value >= today ? "Date must be in the past." : ""),
    setError(country, country.value ? "" : "Choose a country."),
    setError(pw, pw.value.length < 8 ? "Use at least 8 characters." : ""),
    setError(cf, cf.value !== pw.value || !cf.value ? "Passwords do not match." : ""),
  ];
  return results.every(Boolean);
}

/* ==================== 6. REGISTER ==================== */
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessage();
  if (!validateRegister()) return;
  const users = getUsers();
  const email = $("regEmail").value.trim().toLowerCase();
  if (users[email]) { setError($("regEmail"), "This email is already registered."); return; }
  users[email] = {
    name: $("regName").value.trim(), email,
    phone: $("regPhone").value.trim(), dob: $("regDob").value,
    country: $("regCountry").value, password: await hash($("regPassword").value),
    logins: 0,
  };
  saveUsers(users);
  registerForm.reset();
  show(loginForm);
  message("Registration successful. Please login to continue.");
});

/* ==================== 7. LOGIN ==================== */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessage();
  const emailEl = $("loginEmail"), pwEl = $("loginPassword");
  const okEmail = setError(emailEl, emailOk(emailEl.value.trim()) ? "" : "Enter a valid email address.");
  const okPw = setError(pwEl, pwEl.value ? "" : "Enter your password.");
  if (!okEmail || !okPw) return;

  const users = getUsers();
  const user = users[emailEl.value.trim().toLowerCase()];
  if (!user || user.password !== (await hash(pwEl.value))) {
    message("Incorrect email or password. New here? Click Register here.", true);
    return;
  }
  const firstTime = user.logins === 0;
  user.logins += 1;
  saveUsers(users);
  localStorage.setItem("cfc_session", user.email);
  loginForm.reset();

  // Login message + welcome message (first visit vs returning)
  showWelcome(user, firstTime ? "Welcome to Chelsea, " + user.name + "!" : "Welcome back, " + user.name + "!");
  message("Login successful.");
});

/* ==================== 8. SIGN OUT ==================== */
function signOut() {
  localStorage.removeItem("cfc_session");
  show(loginForm);
  message("You have signed out. See you at the Bridge!");
}
signOutBtn.addEventListener("click", signOut);
$("welcomeSignOut").addEventListener("click", signOut);

/* ==================== 9. SWITCH LOGIN / REGISTER ==================== */
$("showRegister").addEventListener("click", (e) => { e.preventDefault(); clearMessage(); show(registerForm); });
$("showLogin").addEventListener("click", (e) => { e.preventDefault(); clearMessage(); show(loginForm); });



/* ==================== 11. RESET FORM BUTTON ==================== */
$("resetBtn").addEventListener("click", () => {
  const active = [loginForm, registerForm].find((f) => !f.hidden);
  if (!active) return; // nothing to reset on the welcome view
  active.reset();
  active.querySelectorAll(".invalid").forEach((i) => i.classList.remove("invalid"));
  active.querySelectorAll(".err").forEach((s) => (s.textContent = ""));
  clearMessage();
});

/* ==================== 12. ON PAGE LOAD (remember signed-in user) ==================== */
(function init() {
  const email = getSession(), user = email && getUsers()[email];
  if (user) showWelcome(user, "Welcome back, " + user.name + "!");
  else show(loginForm);
})();




/* ===== HERO STANDINGS ===== */
(function () {

  /* ===== EDIT YOUR STANDINGS HERE =====
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
  function init() {
    const body  = document.getElementById("standingsBody");
    const table = document.querySelector(".standings-table");
    const tabs  = document.querySelectorAll(".standings-tabs .tab");

    if (!body || !table) {
      console.error("Standings: #standingsBody or .standings-table not found in the page");
      return;
    }

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

        table.classList.add("is-switching");          // fade out
        setTimeout(() => {
          render(tab.dataset.team);                    // swap the rows
          table.classList.remove("is-switching");      // fade back in
        }, 250);
      });
    });

    render("mens"); // default view
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();





























//ABOUT PAGE //


"use strict";


/* =========================================
   MOMENTS IN TIME SLIDER
========================================= */

const momentCards = document.querySelectorAll(".moment-card");
const previousMoment = document.getElementById("previousMoment");
const nextMoment = document.getElementById("nextMoment");
const momentCounter = document.getElementById("momentCounter");

if (
    momentCards.length > 0 &&
    previousMoment &&
    nextMoment &&
    momentCounter
) {

    let currentMoment = 0;

    function showMoment(index) {

        momentCards.forEach(function (card) {
            card.classList.remove("active-moment");
        });

        momentCards[index].classList.add("active-moment");

        momentCounter.textContent =
            (index + 1) + " / " + momentCards.length;
    }


    nextMoment.addEventListener("click", function () {

        currentMoment++;

        if (currentMoment >= momentCards.length) {
            currentMoment = 0;
        }

        showMoment(currentMoment);
    });


    previousMoment.addEventListener("click", function () {

        currentMoment--;

        if (currentMoment < 0) {
            currentMoment = momentCards.length - 1;
        }

        showMoment(currentMoment);
    });


    showMoment(currentMoment);
}



/* =========================================
   CHELSEA CLUB FACTS SLIDER
========================================= */

const factCards = document.querySelectorAll(".fact-card");
const previousFact = document.getElementById("previousFact");
const nextFact = document.getElementById("nextFact");
const factCounter = document.getElementById("factCounter");

if (
    factCards.length > 0 &&
    previousFact &&
    nextFact &&
    factCounter
) {

    let currentFact = 0;

    function showFact(index) {

        factCards.forEach(function (card) {
            card.classList.remove("active-fact");
        });

        factCards[index].classList.add("active-fact");

        factCounter.textContent =
            (index + 1) + " / " + factCards.length;
    }


    nextFact.addEventListener("click", function () {

        currentFact++;

        if (currentFact >= factCards.length) {
            currentFact = 0;
        }

        showFact(currentFact);
    });


    previousFact.addEventListener("click", function () {

        currentFact--;

        if (currentFact < 0) {
            currentFact = factCards.length - 1;
        }

        showFact(currentFact);
    });


    showFact(currentFact);
}
