// Burger
function toggleBurger() {

    var x = document.getElementById("hamburger-box");

    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
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
