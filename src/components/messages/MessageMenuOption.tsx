import React,{MouseEvent, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { RootStore } from '../../store/store';

interface IProps{
    onClickedOption:(e:MouseEvent)=>void;
    name:string;
    img: string;
}
const MessageMenuOption :React.FC<IProps> = (props) => {
    const selectedOption = useSelector((state:RootStore)=>state.ui.messagesSelectedItem);
    useEffect(()=>{

    },[selectedOption])
    return (
        <div onClick={props.onClickedOption} className={`header-messages-item ${selectedOption===props.name ?'active':""}`}>
          <img src={props.img} alt="" />
          <h2>{props.name}</h2>
        </div>
    )
}

export default MessageMenuOption
