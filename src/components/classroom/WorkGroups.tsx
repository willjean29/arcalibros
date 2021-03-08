import React from 'react'
import StreammingGroupCard from '../streamming/StreammingGroupCard'

const WorkGroups = () => {
    return (
        <div className="workgroup-container global-container">
            <h2>Grupos de trabajo</h2>

            <div className="streamming-group-container">
                <StreammingGroupCard name="Grupo 1" idGroup="1" />
                <StreammingGroupCard name="Grupo 2" idGroup="2" />
                <StreammingGroupCard name="Grupo 3" idGroup="3" />
                <StreammingGroupCard name="Grupo 4" idGroup="4" />
                <StreammingGroupCard name="Grupo 5" idGroup="5" />
                <StreammingGroupCard name="Grupo 6" idGroup="6" />
            </div>
        </div>
    )
}

export default WorkGroups
