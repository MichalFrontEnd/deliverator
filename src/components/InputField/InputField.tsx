import React, { FC, InputHTMLAttributes } from "react";
import './inputfield.css'

type Props = {
    name: string,
    label: string,
    unit: string,
} & InputHTMLAttributes<HTMLInputElement>

const InputField: FC<Props> = ({ name, label, unit,...rest }) => {
    return (
        <div className="input-container">
            <div className="input-group">
                <label htmlFor={name}>{label}</label>
                <input id={name}{...rest}></input>
                <p>{unit}</p>
            </div>
        </div>
    )
}

export default InputField;