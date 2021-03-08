window.addEventListener("DOMContentLoaded", () => {
  const paintme = document.querySelector("#paintme");
  const canvas = document.querySelector("#canvas");
  const ctxX = canvas.getContext('2d');
  const btnCloseModal = document.querySelectorAll(".btn-close-modal-size");
  const btnCloseModalBg = document.querySelectorAll(".btn-close-modal-bg");


  const btnBgTransparent = document.querySelector("#opt1");
  const btnBgWhite = document.querySelector("#opt2");
  const btnBgSquared = document.querySelector("#opt3");
  const btnBgLined = document.querySelector("#opt4");


  const modalSize = document.querySelector("#size-modal");
  const modalBg = document.querySelector("#bg-modal");

  const btnClose = document.querySelector(".btn-close");

  const btnShape = document.querySelector("#fill-toggle");
  const btnBg = document.querySelector("#btn-bg");

  const btnSize = document.querySelector(".btn-si");
  console.log(btnSize)

  btnCloseModal.forEach((buttonCloseModal) => {
    buttonCloseModal.addEventListener("click", () => {
      modalSize.classList.remove("show");
      modalBg.classList.remove("show");
    });
  });

  btnCloseModalBg.forEach((buttonCloseModal) => {
    buttonCloseModal.addEventListener("click", () => {
      modalBg.classList.remove("show");
      modalSize.classList.remove("show");
    });
  });


  btnBg.addEventListener("click", () => {
    modalBg.classList.toggle("show")
    modalSize.classList.remove("show");
  });

  // btnBgTransparent.addEventListener("click", () => {
  //   canvas.classList.add("transparent");
  //   canvas.classList.remove("lined");
  //   canvas.classList.remove("squared");
  //   canvas.classList.remove("white");
  // });
  // btnBgWhite.addEventListener("click", () => {
  //   canvas.classList.add("white");
  //   canvas.classList.remove("lined");
  //   canvas.classList.remove("squared");
  //   canvas.classList.remove("transparent");
  // });
  // btnBgSquared.addEventListener("click", () => {
  //   canvas.classList.remove("white");
  //   canvas.classList.remove("lined");
  //   canvas.classList.add("squared");
  //   canvas.classList.remove("transparent");
  // });
  // btnBgLined.addEventListener("click", () => {
  //   canvas.classList.remove("white");
  //   canvas.classList.add("lined");
  //   canvas.classList.remove("squared");
  //   canvas.classList.remove("transparent");
  // });


  btnBgTransparent.addEventListener("click", () => {
    canvas.style.background = "transparent";
  });
  btnBgWhite.addEventListener("click", () => {
    canvas.style.background = "white";
    canvas.style.backgroundImage = "url('./assets/images/white.png')";   
  });
  btnBgSquared.addEventListener("click", () => {
    canvas.style.background = "white";
    canvas.style.backgroundSize = "200px 200px";
    canvas.style.backgroundImage = "url('./assets/images/grid-pattern.png')";
    canvas.style.transition = "background .2s ease-in-out";
  });
  btnBgLined.addEventListener("click", () => {
    canvas.style.background = "white";
    canvas.style.backgroundSize = "600px 600px";
    canvas.style.backgroundImage = "url('./assets/images/lined.png')";
    canvas.style.transition = "background .2s ease-in-out";
  });
  


  btnShape.addEventListener("click", () => {
    btnShape.classList.toggle("active");
    console.log("active")
  });

  btnClose.addEventListener("click", () => {
    paintme.classList.toggle("show");
  });

  btnSize.addEventListener("click", () => {
    modalSize.classList.toggle("show");
    modalBg.classList.remove("show");
  });
});





// window.addEventListener("onreload", ()=>{
//     let pathname = window.location.pathname;
//     console.log(pathname)
// })

// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimaitonFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
