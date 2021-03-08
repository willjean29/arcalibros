import React from 'react'
import imgAdd from "../../assets/icons/add.png";
import imgTag from "../../assets/icons/tag.png";
const ItemPreviewHomework = () => {
    return (
        <div className="question-bank-item bordered">
        <div className="question-bank-header">
          <div className="left-content">
            <div className="type-of-question">
              <img src="" alt="" />
            </div>
            <h3>
              Nombre Tarea (Agregada)
            </h3>
          </div>
          <div className="right-content">
            <div className="btn-add">
              <img src={imgAdd} alt="" />
            </div>
          </div>
        </div>
        <div className="question-bank-body">
          <h3 className="question">Lorem ipsum dolor sit.</h3>
        </div>
        <hr />
        <div className="question-bank-footer">
          <div className="course-tag">
            <img src={imgTag} alt="" />
            Comunicación
          </div>
        </div>
      </div>
    )
}

export default ItemPreviewHomework
