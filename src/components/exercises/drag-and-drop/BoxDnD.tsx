import React,{DragEvent} from 'react'
interface IProps{
    id:string;
    boxName:string;   
    draggable:boolean | "true" | "false" | undefined;
    dragStart:(e:any)=>void;
    dragEnd:(e:any)=>void;
    dragOverOption:(e:any)=>void;
}

const BoxDnD:React.FC<IProps> = (props) => {

    

    return (
        <div
            id={props.id}
            className="dnd-box"
            draggable={props.draggable}
            onDragStart={props.dragStart}
            onDragOver={props.dragOverOption}
            onDragEnd={props.dragEnd}
        >
            {props.boxName}
        </div>
    )
}

export default BoxDnD
