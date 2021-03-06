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
function toggleQuery() {
  var query = document.getElementById("query-box");
  if (query.style.display === "flex") {
    query.style.display = "none";
  } else {
    query.style.display = "flex";
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


