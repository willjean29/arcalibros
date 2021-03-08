import React, { useState } from 'react'
import { Course } from "../../../utils/enums";

const SelectHomeworkBank = () => {
    const [course, setCourse] = useState(Course.COMUNICACION as string);
    return (
        <div className="evaluation-form-container">
          <form className="evaluation-form">

          <div className="form-input">
              <label htmlFor="">Nombre de la tarea</label>
              <input className="input" type="text" placeholder="Ingresar nombre" />
            </div>

            <div className="form-input">
              <label htmlFor="">Curso</label>
              <select
                className="input"
                name="course"
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value={Course.COMUNICACION}>Comunicación</option>
                <option value={Course.MATEMATICA}>Matemática</option>
                <option value={Course.PERSONAL_SOCIAL}>Personal Social</option>
                <option value={Course.ARTE}>Arte</option>
                <option value={Course.COMPUTACION}>Computación</option>
                <option value={Course.CTA}>Ciencia y Ambiente</option>
                <option value={Course.INGLES}>Inglés</option>
                <option value={Course.INNOVACION}>Innovación</option>
              </select>
            </div>

            <div className="form-input">
              <label htmlFor="">Nivel</label>
              <select
                className="input"
                name="course"
                onChange={(e) => setCourse(e.target.value)}
              >
                <option>Inicial</option>
                <option>Primaria</option>
                <option>Secundaria</option>
              </select>
            </div>

            <div className="form-input small">
              <label htmlFor="">Grado</label>
              <input className="input" type="text" placeholder="Grado" />
            </div>
          </form>
        </div>
    )
}

export default SelectHomeworkBank
