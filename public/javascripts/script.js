// Burger
function toggleBurger() {
    var hamburger = document.getElementById("hamburger-box");

    if (hamburger.style.display === "flex") {
      hamburger.style.display = "none";
    } else {
      hamburger.style.display = "flex";
    }
  }
