    // Get the modal
    var modal = document.getElementById("app-modal");
    var modalText = document.getElementById("modal-text");
    var span = document.getElementsByClassName("close")[0]; 
    
    function message(message) {
      modal.style.display = "block";
      modalText.innerText = message;  

      setTimeout(function(){ 
        modal.style.display = "none";
      }, 7500);
  
    }
    
    span.onclick = function() {
      modal.style.display = "none";
    }
    