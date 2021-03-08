import React from 'react'

interface ButtonProps {
    className: string;
    text: string;
}

const Button:React.FC<ButtonProps> = (props) => {
    return (
        <button className={props.className}>
            {props.text}
        </button>
    )
}

export default Button
