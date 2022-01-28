import dist from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import InputField from '../../components/InputField/InputField';

import './inputform.css';

const InputForm = () => {

    const [cartValue, setCartValue] = useState(0);
    const [distance, setDistance] = useState(0);
    const [numOfItems, setNumOfItems] = useState(0);
    //placeholder for time thingie
    const [deliveryFee, setDeliveryFee] = useState(0);
    //think whether create state placeholder for each fee section and add all up or not.

    useEffect(() => {
        if (deliveryFee > 15) {
            console.log("delivery was over 15")
            setDeliveryFee(15)
        }
    }, [deliveryFee])

    useEffect(() => {
        if (cartValue => 100) {
            //if cart over 100, ensure delivery is free no matter what
            //*check if includes rush hour
            console.log("cart is over 100")
            setDeliveryFee(deliveryFee * 0)
        }
    }, [cartValue])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartValue != 0 && cartValue < 10) {
            checkCartValDif(cartValue)
        } else {
            setDeliveryFee(0)
        }

        //if adding unit select, check it here using select && number
        checkDistanceCost(distance);
    }

    const checkCartValDif = (cartValue) => {
        setDeliveryFee(deliveryFee + (10 - cartValue))
    }

    const checkDistanceCost = (distance) => {
        console.log("I can go the distance", distance)
        let distanceInKm = distance * 1000;
        console.log('distanceInKm: ', distanceInKm);

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
                <h3>Delivery Fee {deliveryFee}€</h3>
            </form>
        </>
    )
}

export default InputForm;