// document.addEventListener('DOMContentLoaded', () => {

// }, false);

function toggleBurger() {

    var x = document.getElementById("hamburger-box");

    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }