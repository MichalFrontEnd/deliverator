import React, { ChangeEventHandler } from "react";
import './inputfield.css'

type Props = {
    name: string,
    label: string,
    value: number | string,
    unit: string,
    onChange: ChangeEventHandler
}
const InputField = ({ name, label, value, unit, onChange }: Props) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input type="text" name={name} value={value} onChange={onChange}></input>
            <p>{unit}</p>
        </div>
    )
}

export default InputField;