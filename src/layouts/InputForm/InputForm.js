import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';

import './inputform.css';

const InputForm = () => {

    const [cartValue, setCartValue] = useState(0);
    const [distance, setDistance] = useState(0);
    const [numOfItems, setNumOfItems] = useState(0);
    //placeholder for time thingie
    const [deliveryFee, setDeliveryFee] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted");
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
            >
                <InputField
                    name="cart-value"
                    label="Cart Value"
                    value={cartValue}
                    unit="€"
                    onChange={(e) => {
                        setCartValue(e.target.value)
                    }} />
                <InputField
                    name="distance"
                    label="Distance"
                    value={distance}
                    //add select input for km/m
                    unit="km"
                    onChange={(e) => {
                        setDistance(e.target.value)
                    }} />
                <InputField
                    name="numOfItems"
                    label="Number of Items"
                    value={numOfItems}
                    unit=""
                    onChange={(e) => {
                        setNumOfItems(e.target.value)
                    }} />

                <button className="calculate-fee-btn" type="submit">Calculate my fee</button>
            </form>
        </>
    )
}

export default InputForm;