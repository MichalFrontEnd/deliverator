import React, { useState } from "react";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./feeform.css";
import { calculateCartFee, calculateDistanceFee, calculateItemNumberFee, calculateRushHourFee, isMaxFee, isMaxCartValue } from "./utils";

const InputForm = () => {
    const [cartValue, setCartValue] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);
    const [numOfItems, setNumOfItems] = useState<number>(0);
    const [startDate, setStartDate] = useState(new Date());
    const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const [error, setError] = useState("");

    const re = /^[0-9\b]+$/;

    const handleSubmit = (e): void => {
        e.preventDefault();
        //prevent submition of empty fields
        if (cartValue === 0 || distance === 0 || numOfItems === 0) {
            return setError("please fill all the fields!");
        }
        //sets free delivery for purchases over 100e
        if (isMaxCartValue(cartValue)) {
            setDeliveryFee(deliveryFee * 0);
        } else {
            //if delivery should be charged, set max delivery price at 15e, check for rush hour delivery.
            let totalFee: number = calculateCartFee(cartValue) + calculateDistanceFee(distance) + calculateItemNumberFee(numOfItems);
            totalFee = calculateRushHourFee(startDate, totalFee);
            isMaxFee(totalFee) ? setDeliveryFee(15) : setDeliveryFee(totalFee);
        }
    };

    return (
        <div className="form-container">
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit}>
                <InputField
                    name="cart-value"
                    label="Cart Value"
                    value={cartValue}
                    unit="€"
                    type="number"
                    onChange={(e) => {
                        if (e.target.value === "" || re.test(e.target.value)) {
                            setCartValue(parseFloat(e.target.value));
                        }
                    }}
                    required
                />
                <InputField
                    name="distance"
                    label="Distance"
                    value={distance}
                    unit="m"
                    type="number"
                    onChange={(e) => {
                        if (e.target.value === "" || re.test(e.target.value)) {
                            setDistance(parseInt(e.target.value, 10));
                        }
                    }}
                    required
                />
                <InputField
                    name="numOfItems"
                    label="Number of Items"
                    value={numOfItems}
                    unit=""
                    type="number"
                    onChange={(e) => {
                        if (e.target.value === "" || re.test(e.target.value)) {
                            setNumOfItems(parseInt(e.target.value, 10));
                        }
                    }}
                    required
                />
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" />
                <button className="calculate-fee-btn" type="submit">
                    Calculate my fee
                </button>
            </form>
            <h3 className="delivery-fee">Delivery Fee {deliveryFee} €</h3>
        </div>
    );
};

export default InputForm;
