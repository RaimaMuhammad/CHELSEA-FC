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




