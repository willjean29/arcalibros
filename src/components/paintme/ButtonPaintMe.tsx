import React from "react";
import { createPortal } from "react-dom";

import imgPalette from '../../assets/icons/icons8_paint_palette.svg'

const ButtonPaintMe = () => {

  const showApp = () => {
    console.log("paintme")


    const myPaintme = document.getElementById("paintme") as HTMLElement;
    myPaintme.classList.toggle("show");

  }
  return createPortal(
    <button id="paintme-button" onClick={() => showApp()}>
      <img src={imgPalette} alt="" />
    </button>,
    document.body
  );
};

export default ButtonPaintMe;
