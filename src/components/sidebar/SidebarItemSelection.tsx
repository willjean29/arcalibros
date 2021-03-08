import React from 'react'
import { Link } from 'react-router-dom'
interface IProps{
    name:string;
    path:string;
    style:string;
    img: string;
    click:(e:any)=>void;
}
const SidebarItem : React.FC<IProps> = ({path,style,click,name,img}) => {
    return (
        <div className="item-container">
              <Link
                to={path}
                className={style}
                onClick={click}
              >
                <img src={img} alt=""/>
                <h5>{name}</h5>
              </Link>
            </div>
    )
}

export default SidebarItem
