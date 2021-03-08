import React from 'react'
import { Link } from 'react-router-dom'
import { RootStore } from "../../store/store";
import { Classroom } from "../../store/classroom/interfaces/classroom.interface";
import { useSelector } from 'react-redux';
import StreammingGroupPage from '../../pages/StreammingGroupPage';

interface Props {
    idGroup: string;
    name: string;
}

const StreammingGroupCard: React.FC<Props> = ({idGroup, name}) => {
    const classroom = useSelector(
        (state: RootStore) => state.classroom.selectedClassroom
      ) as Classroom;

    return (
        <div className="streamming-group-card">
            <div className="name">{name}</div>
            <small>{}</small>
            <Link to={`/plataforma/grupo-transmision/${classroom._id}${idGroup}`} target="_blank" >ir a sala</Link>
        </div>
    )
}

export default StreammingGroupCard
