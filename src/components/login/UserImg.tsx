import React from 'react'
interface IProps{
    userImage:string;
}
const UserImg : React.FC<IProps>= (props) => {
    return (
        <div className="image-user">
              <img src={props.userImage} alt="" />
            </div>
    )
}

export default UserImg
