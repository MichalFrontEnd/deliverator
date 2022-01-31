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
            <label htmlFor={name}>{label}</label>
            <div className="input-group">
                <input id={name}{...rest}></input>
                <p className="unit">{unit}</p>
            </div>
        </div>
    )
}

export default InputField;