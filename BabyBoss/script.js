document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize star ratings & data-ratings
    const starRatings = document.querySelectorAll(".star-rating");
    starRatings.forEach((starRatingElem) => {
      const initialRating = parseInt(starRatingElem.getAttribute("data-rating"));
      starRatingElem.dataset.ratings = JSON.stringify([initialRating]);
      starRatingElem.innerHTML = createStars(initialRating);
    });
  
    // 2. Toggle review form
    const addReviewButtons = document.querySelectorAll(".add-review-btn");
    addReviewButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const reviewForm = btn.nextElementSibling;
        reviewForm.style.display =
          reviewForm.style.display === "none" ? "block" : "none";
      });
    });
  
    // 3. Handle submitting reviews
    const submitReviewBtns = document.querySelectorAll(".submitReviewBtn");
    submitReviewBtns.forEach((submitBtn) => {
      submitBtn.addEventListener("click", () => {
        const formContainer = submitBtn.parentElement;
        const ratingSelect = formContainer.querySelector(".ratingSelect");
        const commentInput = formContainer.querySelector(".commentInput");
        const babysitterCard = formContainer.parentElement; // .babysitter-card
        const starRatingElem = babysitterCard.querySelector(".star-rating");
        const commentsList = babysitterCard.querySelector(".comments-list");
  
        // Add the user's comment
        const newComment = document.createElement("li");
        newComment.textContent = commentInput.value || "תגובה ללא מלל";
        commentsList.appendChild(newComment);
  
        // Update rating array & compute average
        const newRating = parseInt(ratingSelect.value);
        const existingRatings = JSON.parse(starRatingElem.dataset.ratings);
        existingRatings.push(newRating);
  
        const averageRating =
          existingRatings.reduce((acc, curr) => acc + curr, 0) /
          existingRatings.length;
  
        starRatingElem.dataset.ratings = JSON.stringify(existingRatings);
        starRatingElem.setAttribute("data-rating", averageRating.toFixed(1));
        starRatingElem.innerHTML = createStars(Math.round(averageRating));
  
        // Clear the form
        commentInput.value = "";
        ratingSelect.value = "5";
        formContainer.style.display = "none";
      });
    });
  
    // 4. Contact button -> redirect to contact.html with babysitter info
const contactBtns = document.querySelectorAll(".contactBtn");
contactBtns.forEach((contactBtn) => {
  contactBtn.addEventListener("click", () => {
    const name = contactBtn.dataset.name || "לא ידוע";
    const phone = contactBtn.dataset.phone || "לא ידוע";
    const email = contactBtn.dataset.email || "לא ידוע";
    const age = contactBtn.dataset.age || "לא צוין";
    const street = contactBtn.dataset.street || "לא צוין";
    const imgURL = contactBtn.dataset.img || "https://via.placeholder.com/150";

    sessionStorage.setItem("babysitterName", name);
    sessionStorage.setItem("babysitterPhone", phone);
    sessionStorage.setItem("babysitterEmail", email);
    sessionStorage.setItem("babysitterAge", age);
    sessionStorage.setItem("babysitterStreet", street);
    sessionStorage.setItem("babysitterImg", imgURL);

    window.location.href = "contact.html";
  });
});

  
    // 5. Search functionality
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const babysittersList = document.getElementById("babysittersList");
  
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      const babysitterCards = babysittersList.querySelectorAll(".babysitter-card");
      babysitterCards.forEach((card) => {
        const nameElem = card.querySelector("h3");
        if (!nameElem.textContent.includes(query) && query !== "") {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      });
    });
  });
  
  // Helper to create star visuals
  function createStars(rating) {
    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      starsHtml += i < rating ? "★" : "☆";
    }
    return `<span class="stars">${starsHtml}</span>`;
  }
  