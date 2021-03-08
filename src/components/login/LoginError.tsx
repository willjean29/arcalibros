import React from 'react'
interface IProps{
    loginError:string|null;
}
const LoginError : React.FC<IProps>= (props) => {
    return (
        <div className="alert alert-danger">
                <div className="alert-error">
                  {props.loginError}
                  <button>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </div>
    )
}

export default LoginError