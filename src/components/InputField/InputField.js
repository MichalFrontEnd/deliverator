import react from "react";
import './inputfield.css'

const InputField = ({ name, label, value, unit, onChange }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input type="text" name={name} value={value} onChange={onChange}></input>
            <p>{unit}</p>
        </div>
    )
}

export default InputField;