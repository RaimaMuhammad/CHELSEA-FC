


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
   CHELSEA FC LOGIN & REGISTRATION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET LOGIN / REGISTER ELEMENTS
    ===================================================== */

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    const regName = document.getElementById("regName");
    const regEmail = document.getElementById("regEmail");
    const regPhone = document.getElementById("regPhone");
    const regDob = document.getElementById("regDob");
    const regCountry = document.getElementById("regCountry");
    const regPassword = document.getElementById("regPassword");
    const regConfirm = document.getElementById("regConfirm");

    const banner = document.getElementById("banner");

    const welcomeView = document.getElementById("welcomeView");
    const welcomeTitle = document.getElementById("welcomeTitle");
    const welcomeText = document.getElementById("welcomeText");

    const signOutBtn = document.getElementById("signOutBtn");
    const welcomeSignOut = document.getElementById("welcomeSignOut");

    const resetBtn = document.getElementById("resetBtn");


    /* =====================================================
       IF THIS IS NOT THE LOGIN PAGE, STOP
    ===================================================== */

    if (!loginForm || !registerForm) {
        return;
    }


    /* =====================================================
       COUNTRY LIST
    ===================================================== */

    const countries = [
        "Uganda",
        "Kenya",
        "Tanzania",
        "Rwanda",
        "South Sudan",
        "Nigeria",
        "Ghana",
        "South Africa",
        "United Kingdom",
        "United States",
        "Canada",
        "Australia",
        "Other"
    ];


    countries.forEach(function (country) {

        const option = document.createElement("option");

        option.value = country;
        option.textContent = country;

        regCountry.appendChild(option);

    });


    /* =====================================================
       SHOW REGISTER FORM
    ===================================================== */

    showRegister.addEventListener("click", function (event) {

        event.preventDefault();

        loginForm.hidden = true;

        registerForm.hidden = false;

        banner.hidden = true;

    });


    /* =====================================================
       SHOW LOGIN FORM
    ===================================================== */

    showLogin.addEventListener("click", function (event) {

        event.preventDefault();

        registerForm.hidden = true;

        loginForm.hidden = false;

        banner.hidden = true;

    });


    /* =====================================================
       REGISTER USER
    ===================================================== */

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* GET VALUES */

        const name = regName.value.trim();

        const email = regEmail.value.trim().toLowerCase();

        const phone = regPhone.value.trim();

        const dob = regDob.value;

        const country = regCountry.value;

        const password = regPassword.value;

        const confirmPassword = regConfirm.value;


        /* =================================================
           VALIDATE NAME
        ================================================= */

        if (name === "") {

            showMessage("Please enter your full name.", "error");

            regName.focus();

            return;

        }


        /* =================================================
           VALIDATE EMAIL
        ================================================= */

        if (email === "") {

            showMessage("Please enter your email address.", "error");

            regEmail.focus();

            return;

        }


        /* =================================================
           VALIDATE PHONE
        ================================================= */

        if (phone === "") {

            showMessage("Please enter your phone number.", "error");

            regPhone.focus();

            return;

        }


        /* =================================================
           VALIDATE DATE OF BIRTH
        ================================================= */

        if (dob === "") {

            showMessage("Please enter your date of birth.", "error");

            regDob.focus();

            return;

        }


        /* =================================================
           VALIDATE COUNTRY
        ================================================= */

        if (country === "") {

            showMessage("Please select your country.", "error");

            regCountry.focus();

            return;

        }


        /* =================================================
           VALIDATE PASSWORD
        ================================================= */

        if (password.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            regPassword.focus();

            return;

        }


        /* =================================================
           CHECK PASSWORDS
        ================================================= */

        if (password !== confirmPassword) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            regConfirm.focus();

            return;

        }


        /* =================================================
           GET EXISTING USERS
        ================================================= */

        let users = JSON.parse(
            localStorage.getItem("chelseaUsers")
        ) || [];


        /* =================================================
           CHECK EXISTING EMAIL
        ================================================= */

        const existingUser = users.find(function (user) {

            return user.email === email;

        });


        if (existingUser) {

            showMessage(
                "This email is already registered. Please login.",
                "error"
            );

            return;

        }


        /* =================================================
           CREATE USER
        ================================================= */

        const newUser = {

            name: name,

            email: email,

            phone: phone,

            dob: dob,

            country: country,

            password: password

        };


        /* =================================================
           SAVE USER
        ================================================= */

        users.push(newUser);

        localStorage.setItem(
            "chelseaUsers",
            JSON.stringify(users)
        );


        /* =================================================
           SUCCESS MESSAGE
        ================================================= */

        showMessage(
            "Registration successful! You can now login.",
            "success"
        );


        /* =================================================
           CLEAR FORM
        ================================================= */

        registerForm.reset();


        /* =================================================
           SWITCH TO LOGIN
        ================================================= */

        setTimeout(function () {

            registerForm.hidden = true;

            loginForm.hidden = false;

            banner.hidden = true;

        }, 1500);

    });


    /* =====================================================
       LOGIN USER
    ===================================================== */

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            loginEmail.value.trim().toLowerCase();

        const password =
            loginPassword.value;


        /* =================================================
           GET USERS
        ================================================= */

        const users = JSON.parse(
            localStorage.getItem("chelseaUsers")
        ) || [];


        /* =================================================
           FIND USER
        ================================================= */

        const user = users.find(function (user) {

            return (
                user.email === email &&
                user.password === password
            );

        });


        /* =================================================
           USER NOT FOUND
        ================================================= */

        if (!user) {

            showMessage(
                "Incorrect email or password.",
                "error"
            );

            return;

        }


        /* =================================================
           SAVE LOGIN
        ================================================= */

        localStorage.setItem(
            "chelseaLoggedIn",
            "true"
        );

        localStorage.setItem(
            "chelseaCurrentUser",
            JSON.stringify(user)
        );


        /* =================================================
           SHOW WELCOME
        ================================================= */

        loginForm.hidden = true;

        registerForm.hidden = true;

        welcomeView.hidden = false;

        signOutBtn.hidden = false;

        welcomeTitle.textContent =
            "Welcome, " + user.name + "!";

        welcomeText.textContent =
            "You are successfully signed in as " +
            user.email + ".";

    });


    /* =====================================================
       SIGN OUT
    ===================================================== */

    function signOut() {

        localStorage.removeItem("chelseaLoggedIn");

        localStorage.removeItem("chelseaCurrentUser");

        welcomeView.hidden = true;

        signOutBtn.hidden = true;

        loginForm.hidden = false;

        registerForm.hidden = true;

        loginForm.reset();

        showMessage(
            "You have been signed out.",
            "success"
        );

    }


    if (signOutBtn) {

        signOutBtn.addEventListener(
            "click",
            signOut
        );

    }


    if (welcomeSignOut) {

        welcomeSignOut.addEventListener(
            "click",
            signOut
        );

    }


    /* =====================================================
       RESET FORM
    ===================================================== */

    if (resetBtn) {

        resetBtn.addEventListener("click", function () {

            loginForm.reset();

            registerForm.reset();

            banner.hidden = true;

        });

    }


    /* =====================================================
       MESSAGE FUNCTION
    ===================================================== */

    function showMessage(message, type) {

        banner.textContent = message;

        banner.hidden = false;

        if (type === "error") {

            banner.style.color = "#b00020";

        } else {

            banner.style.color = "#008000";

        }

    }


    /* =====================================================
       CHECK IF USER IS ALREADY LOGGED IN
    ===================================================== */

    const loggedIn =
        localStorage.getItem("chelseaLoggedIn");

    const currentUser =
        JSON.parse(
            localStorage.getItem("chelseaCurrentUser")
        );


    if (loggedIn === "true" && currentUser) {

        loginForm.hidden = true;

        registerForm.hidden = true;

        welcomeView.hidden = false;

        signOutBtn.hidden = false;

        welcomeTitle.textContent =
            "Welcome back, " + currentUser.name + "!";

        welcomeText.textContent =
            "You are already signed in as " +
            currentUser.email + ".";

    }

});



    


   











/* =========================================================
   CHELSEA FC MEGASTORE
   SHOPPING CART + ADD TO CART
========================================================= */


/* =========================================================
   CART STORAGE
========================================================= */

let cart = JSON.parse(localStorage.getItem("chelseaCart")) || [];


/* =========================================================
   GET CART ELEMENTS
========================================================= */

const cartButton = document.getElementById("cartButton");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const cartSuccess = document.getElementById("cartSuccess");


/* =========================================================
   ADD ITEM TO CART
========================================================= */

document.querySelectorAll(".add-cart-button").forEach(function (button) {

    button.addEventListener("click", function () {

        /* Find the product containing this button */

        const productCard = button.closest(".product-card");

        if (!productCard) {
            return;
        }


        /* Get product information */

        const productName =
            productCard.dataset.product;

        const productPrice =
            Number(productCard.dataset.price);

        const productImage =
            productCard.querySelector("img").src;


        /* =================================================
           GET SELECTED SIZE
        ================================================= */

        const sizeSelect =
            productCard.querySelector(".product-size");


        let selectedSize = "One Size";


        if (sizeSelect) {

            selectedSize = sizeSelect.value;

        }


        /* =================================================
           REQUIRE SIZE
        ================================================= */

        if (!selectedSize) {

            alert("Please select a size before adding this item to your cart.");

            return;

        }


        /* =================================================
           CHECK IF SAME PRODUCT + SAME SIZE EXISTS
        ================================================= */

        const existingItem = cart.find(function (item) {

            return (
                item.name === productName &&
                item.size === selectedSize
            );

        });


        /* =================================================
           INCREASE QUANTITY
        ================================================= */

        if (existingItem) {

            existingItem.quantity += 1;

        }

        /* =================================================
           ADD NEW ITEM
        ================================================= */

        else {

            cart.push({

                name: productName,

                price: productPrice,

                image: productImage,

                size: selectedSize,

                quantity: 1

            });

        }


        /* =================================================
           SAVE CART
        ================================================= */

        saveCart();


        /* =================================================
           UPDATE CART
        ================================================= */

        updateCart();


        /* =================================================
           SHOW SUCCESS MESSAGE
        ================================================= */

        showCartSuccess();

    });

});


/* =========================================================
   SAVE CART TO LOCAL STORAGE
========================================================= */

function saveCart() {

    localStorage.setItem(
        "chelseaCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   UPDATE CART
========================================================= */

function updateCart() {

    /* Update number beside cart icon */

    let totalQuantity = 0;

    cart.forEach(function (item) {

        totalQuantity += item.quantity;

    });


    cartCount.textContent = totalQuantity;


    /* =====================================================
       EMPTY CART
    ===================================================== */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "$0.00";

        return;

    }


    /* =====================================================
       DISPLAY CART ITEMS
    ===================================================== */

    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(function (item, index) {

        total +=
            item.price * item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-item-image"
            >

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Size: ${item.size}
                </p>

                <p>
                    $${item.price.toFixed(2)}
                </p>


                <div class="cart-quantity">

                    <button
                        class="quantity-minus"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="quantity-plus"
                        data-index="${index}">
                        +
                    </button>

                </div>


                <button
                    class="remove-cart-item"
                    data-index="${index}">
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    /* =====================================================
       UPDATE TOTAL
    ===================================================== */

    cartTotal.textContent =
        "$" + total.toFixed(2);


    /* =====================================================
       QUANTITY - MINUS
    ===================================================== */

    document.querySelectorAll(".quantity-minus")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);


                if (cart[index].quantity > 1) {

                    cart[index].quantity -= 1;

                }

                else {

                    cart.splice(index, 1);

                }


                saveCart();

                updateCart();

            });

        });


    /* =====================================================
       QUANTITY - PLUS
    ===================================================== */

    document.querySelectorAll(".quantity-plus")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);


                cart[index].quantity += 1;


                saveCart();

                updateCart();

            });

        });


    /* =====================================================
       REMOVE ITEM
    ===================================================== */

    document.querySelectorAll(".remove-cart-item")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);


                cart.splice(index, 1);


                saveCart();

                updateCart();

            });

        });

}


/* =========================================================
   OPEN CART
========================================================= */

if (cartButton) {

    cartButton.addEventListener("click", function () {

        updateCart();

        cartOverlay.classList.add("active");

    });

}


/* =========================================================
   CLOSE CART
========================================================= */

if (closeCart) {

    closeCart.addEventListener("click", function () {

        cartOverlay.classList.remove("active");

    });

}


/* =========================================================
   CLOSE CART WHEN CLICKING OUTSIDE
========================================================= */

if (cartOverlay) {

    cartOverlay.addEventListener("click", function (event) {

        if (event.target === cartOverlay) {

            cartOverlay.classList.remove("active");

        }

    });

}


/* =========================================================
   SUCCESS MESSAGE
========================================================= */

function showCartSuccess() {

    if (!cartSuccess) {
        return;
    }


    cartSuccess.classList.add("show");


    setTimeout(function () {

        cartSuccess.classList.remove("show");

    }, 2500);

}


/* =========================================================
   LOAD CART WHEN PAGE OPENS
========================================================= */

updateCart();
















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