import React from 'react'

const UploadSchoolLogo = () => {
    return (
        <div className="settings-card">
          <h4>Personalice el logo de su plataforma</h4>
          <p>Tamaño máximo de 200x200 pixeles</p>
          <form>
            <input type="file" className="inputUploadFile" required />
            <button type="submit" className="btn-change-info">
              Guardar
            </button>
          </form>
        </div>
    )
}

export default UploadSchoolLogo
