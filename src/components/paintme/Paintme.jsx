import React from "react";
import { createPortal } from "react-dom";

const Paintme = () => {
  return createPortal(
    <div id="paintme">
      {/* Navigation bar */}
      <nav id="main-nav" className="navbar-paintme">
        <div className="container-fluid">
          {/* Shapes */}
          <ul id="shape-list" className="nav-paintme">
            <li className="nav-item-paintme" data-shape="rectangle">
              <a>
                <img
                  src="%PUBLIC_URL%/assets/icons/icons8_rectangle_stroked.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="nav-item-paintme" data-shape="oval">
              <a>
                <img
                  src="%PUBLIC_URL%/assets/icons/icons8_ellipse_stroked.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="nav-item-paintme" data-shape="circle">
              <a>
                <img
                  src="%PUBLIC_URL%/assets/icons/icons8_circled.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="nav-item-paintme" data-shape="line">
              <a>
                <img src="%PUBLIC_URL%/assets/icons/icons8_line.svg" alt="" />
              </a>
            </li>
            <li className="nav-item-paintme" data-shape="lineList">
              <a>
                <span className="glyphicon glyphicon-pencil" />
                <img
                  src="%PUBLIC_URL%/assets/icons/icons8_pencil_tip.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="nav-item-paintme" data-shape="text">
              <a>
                <img src="%PUBLIC_URL%/assets/icons/icons8_text.svg" alt="" />
              </a>
            </li>
          </ul>
          {/* Settings */}
          <ul id="settings-list" className="nav-paintme">
            <li className="nav-item-paintme">
              <a>
                <input id="color-selector" type="color" />
              </a>
            </li>
            <li className="nav-item-paintme">
              <a id="btnModalSizePaint" className="test">
                <img
                  src="%PUBLIC_URL%/assets/icons/icons8_positive_dynamic.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="nav-item-paintme">
              <a id="fill-toggle" data-filled="no">
                <img
                  src="%PUBLIC_URL%/assets/icons/icons8_bring_forward.svg"
                  alt=""
                />
              </a>
            </li>
          </ul>
          {/* IO */}
          <ul id="io-list" className="nav-paintme">
            <li className="nav-item-paintme">
              <a id="img-save">
                <img
                  src="%PUBLIC_URL%/assets/icons/icons8_download_from_cloud.svg"
                  alt=""
                />
              </a>
            </li>
            <li className="nav-item-paintme">
              <a id="img-load">
                <img
                  src="%PUBLIC_URL%/assets/icons/icons8_upload_to_cloud.svg"
                  alt=""
                />
              </a>
            </li>
          </ul>
          {/* Undo + Redo */}
          <ul id="time-travel" className="nav-paintme">
            <li className="nav-item-paintme">
              <a id="img-clear">
                <img src="%PUBLIC_URL%/assets/icons/icons8_file.svg" alt="" />
              </a>
            </li>
            <li className="nav-item-paintme">
              <a id="btn-undo">
                <img src="%PUBLIC_URL%/assets/icons/icons8_undo.svg" alt="" />
              </a>
            </li>
            <li className="nav-item-paintme">
              <a id="btn-redo">
                <img src="%PUBLIC_URL%/assets/icons/icons8_redo.svg" alt="" />
              </a>
            </li>
          </ul>
          <ul id="time-travel" className="nav-paintme">
            <li className="nav-item-paintme">
              <a id="img-clear">
                <img src="%PUBLIC_URL%/assets/icons/icons8_file.svg" alt="" />
              </a>
            </li>
            <li className="nav-item-paintme">
              <a id="btn-undo">
                <img src="%PUBLIC_URL%/assets/icons/icons8_undo.svg" alt="" />
              </a>
            </li>
            <li className="nav-item-paintme">
              <a id="btn-redo">
                <img src="%PUBLIC_URL%/assets/icons/icons8_redo.svg" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
        <canvas id="canvas">Tu navegador no soporta esta aplicación :(</canvas>
      </div>
      <div id="size-modal" className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Modificar tamaños</h4>
              <button
                type="button"
                className="close btn-close-modal-size abort"
                data-dismiss="modal"
              >
                <img
                  src="%PUBLIC_URL%/assets/icons/icons8_multiply.svg"
                  alt=""
                />
              </button>
            </div>
            <div className="modal-body">
              <table className="table" id="size-table">
                <tbody>
                  <tr id="font-row" data-value="12pt">
                    <td>Tamaño de fuente</td>
                    <td>
                      <a className="decrease"> - </a>
                    </td>
                    <td className="value-data center">12pt</td>
                    <td className="center">
                      <a className="increase"> + </a>
                    </td>
                  </tr>
                  <tr id="width-row" data-value={1}>
                    <td>Ancho de linea</td>
                    <td>
                      <a className="decrease"> - </a>
                    </td>
                    <td className="value-data center">5</td>
                    <td className="center">
                      <a className="increase"> + </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-close-modal-size abort">
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-close-modal-size confirm"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("paintme-tool")
  );
};

export default Paintme;
