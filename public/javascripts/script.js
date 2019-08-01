// toggle Burger
function toggleBurger() {
    var hamburger = document.getElementById("hamburger-box");

    if (hamburger.style.display === "flex") {
      hamburger.style.display = "none";
    } else {
      hamburger.style.display = "flex";
    }
  }

// toggle slider
function toggleSlider() {
  var slider = document.getElementById("slider-box");

  if (slider.style.display === "flex") {
    slider.style.display = "none";
  } else {
    slider.style.display = "flex";
  }
}

window.addEventListener('DOMContentLoaded', (event) => {

  var water = document.getElementById("water");
  var waterValue = document.getElementById("water_val");
    waterValue.innerHTML = water.value

  var light = document.getElementById("light");
  var lightValue = document.getElementById("light_val");
    lightValue.innerHTML = light.value

  water.addEventListener("input", (event) => {
    console.log('water changed');
    waterValue.innerHTML = water.value;
  });

  light.addEventListener("input", (event) => {
    console.log('light changed');
    lightValue.innerHTML = light.value
  })

});
